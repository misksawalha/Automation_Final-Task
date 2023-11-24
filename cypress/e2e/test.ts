import { Given,When,Then, After } from "@badeball/cypress-cucumber-preprocessor";
const baseUrl = Cypress.config().baseUrl
import { addEmployee } from "../support/functions/addEmployee.func"
import { deleteFunction } from "../support/functions/deleteFunction.func"
import { vacancyId } from "../support/helpers/createVacancyHelper"
import { jobTitleId, jobTitleName } from "../support/helpers/jobTitleHelper";
import addJobTitle from "../support/helpers/jobTitleHelper";
import createVacancy from "../support/helpers/createVacancyHelper";
import createCandidate from "../support/helpers/createCandidateHelper"
import candidateShortListed from "../support/helpers/candidateShortListedHelper"
import candidateFilePage from "../support/page-objects/candidateFilePage";
import CandidateScheduledInterview from "../support/helpers/candidateInterviewHelper"
let candidatePageObject: candidateFilePage = new candidateFilePage()
let empID: any
let vacancyArr: any[] = []

Given('Admin navigates to orangeHRM website and logs in', () => {
  cy.login('Admin', 'admin123');
});

Given('creates a new job title via API', () => {
  addJobTitle.addNewJobTitleViaAPI();
});

Given('adds an employee', () => {
  addEmployee(0).then((response) => {
    empID = Number(response);
  });
});

Given('creates a new vacancy', () => {
  createVacancy.createNewVacancyAPI(empID).then((vacancyName) => {
    vacancyArr.push(vacancyName);
  });
});

Given('creates a new candidate and advances the candidate through the hiring process until "Hired" status', () => {
  createCandidate.createNewCandidateViaAPI();
  // Implement the steps to advance the candidate through the hiring process
});

When('Admin finds the vacancy', () => {
  candidatePageObject.findVacancy(vacancyArr[0]);
});

When('Admin initiates candidate', () => {
  candidatePageObject.applicationInitiated();
});

Then('the downloaded file content should match the uploaded data',()=>{
  candidatePageObject.findVacancyToDownload(vacancyArr[0])
  //candidatePageObject.verifyFileContent('')
})

When('Admin finds the vacancy ', (vacancyName) => {
  candidatePageObject.findVacancy(vacancyArr[0]);
});

When('Admin shortlists the candidate', () => {
  candidatePageObject.shortListStage()
});

When('Admin schedules an interview', () => {
  candidatePageObject.ScheduleInterview()
});

When('Admin passes the interview', () => {
  candidatePageObject.passInterView()
});

When('Admin offers the job', () => {
  candidatePageObject.offerJob()
});

When('Admin hires the candidate', () => {
  candidatePageObject.hire()
});

When('Admin finds the vacancy to download the file', (vacancyName) => {
  candidatePageObject.findVacancyToDownload(vacancyArr[0])
 // candidatePageObject.verifyFileContent('')
});

// Then('the downloaded file content should match the uploaded data', () => {
//   // Implement the steps to verify file content
//   // You can compare downloadedFileContent with the expected content or perform specific verifications
//   // based on the structure and content of your downloaded file
// });

After(() => {
  deleteFunction(vacancyId, 'recruitment/vacancies');
  deleteFunction(jobTitleId, 'admin/job-titles');
  cy.request({
    method: 'DELETE',
    url: `${Cypress.config().baseUrl}/web/index.php/api/v2/pim/employees`,
    body: {
      ids: [empID],
    },
  });
});