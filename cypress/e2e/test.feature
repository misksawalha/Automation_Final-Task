Feature: Candidate Interview Result Verification (Pass/Fail)

  Background:
    Given Admin navigates to orangeHRM website and logs in
    Given creates 2 new vacancies

  Scenario: Admin transitions candidate status to "Interview Passed"
    When Admin changes the candidate status to pass
    Then the candidate status should be updated to "Status: Interview Passed"

  Scenario: Admin transitions candidate status to "Interview Failed"
  
    When Admin changes the candidate status to reject
    Then the candidate status should be updated to "Interview Failed"
