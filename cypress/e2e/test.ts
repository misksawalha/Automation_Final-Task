import { Given,When,Then, After } from "@badeball/cypress-cucumber-preprocessor";

import { userVar } from "../support/variable/addUser.var"
import { addEmployee } from "../support/functions/addEmployee.func"
import { deleteFunction } from "../support/functions/deleteFunction.func"
import { vacancyId } from "../support/helpers/createVacancyHelper"
import { jobTitleId, jobTitleName } from "../support/helpers/jobTitleHelper";
import addJobTitle from "../support/helpers/jobTitleHelper";
import createVacancy from "../support/helpers/createVacancyHelper";
import createCandidate from "../support/helpers/createCandidateHelper"
import candidateShortListed from "../support/helpers/candidateShortListedHelper"
import { ScheduledInterview } from "../support/functions/interViewShceduled.func"
import candidatePage from "../support/page-objects/candidatePage"
import CandidateScheduledInterview from "../support/helpers/candidateInterviewHelper"
let candidatePageObject:candidatePage = new candidatePage()
let empID: any
let vacancyArr:any[]=[]

Given('Admin navigates to orangeHRM website and logs in', () => {
  cy.login('Admin', 'admin123');
  addJobTitle.addNewJobTitleViaAPI();
  addEmployee(0).then((response) => {
    empID = Number(response);
  });
});

Given('creates 2 new vacancies', () => {
  for (let i = 0; i < 2; i++) {
    createVacancy.createNewVacancyAPI(empID, i).then((vacancyName) => {
      vacancyArr.push(vacancyName);
      createCandidate.createNewCandidateViaAPI().then((candidateId) => {
        candidateShortListed.createCandidateShortListedViaAPI(candidateId).then(() => {
          CandidateScheduledInterview.CandidateScheduledInterviewViaAPI(candidateId, empID);
        });
      });
    });
  }
});

When('Admin changes the candidate status to pass', () => {
  candidatePageObject.findVacancy(vacancyArr[0]);
  candidatePageObject.MarkInterviewPassed();
  
});

Then('the candidate status should be updated pass', () => {
  candidatePageObject.checkCandidateStatusIExsit('Status: Interview Passed')
});

When('Admin changes the candidate status to reject', () => {
 
  candidatePageObject.findVacancy(vacancyArr[1]);
  candidatePageObject.MarkInterviewRejected();
  candidatePageObject.checkCandidateStatusIExsit('Status: Rejected')
});

Then('the candidate status should be updated pass', () => {
  candidatePageObject.checkCandidateStatusIExsit('Interview Failed')
});


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
