Feature: Verify that the user can upload a txt file for Application Initiated and Hired statuses

  Background:
    Given Admin navigates to orangeHRM website and logs in
    And creates a new job title via API
    And adds an employee
    And creates a new vacancy
    And creates a new candidate and advances the candidate through the hiring process until "Hired" status

  Scenario: Verify user can upload a txt file for Application Initiated
    When Admin finds the vacancy 
    And Admin initiates candidate
    # And Admin finds the vacancy to download the file
    Then the downloaded file content should match the uploaded data

  Scenario: Verify user can upload a txt file for Hired
    When Admin finds the vacancy 
    And Admin shortlists the candidate
    And Admin schedules an interview
    And Admin passes the interview
    And Admin offers the job
    And Admin hires the candidate
    And Admin finds the vacancy to download the file
    # Then the downloaded file content should match the uploaded data
