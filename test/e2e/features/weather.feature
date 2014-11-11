Feature: Example feature
  As a user of Weather app
  I want to view a list of cities
  So that I can see the weather for each city

  Scenario: Select a city
    Given I am on the Weather app
    When I select a city
    Then I should see the weather of the city

  Scenario: Select another city
    Given I have chosen a city
    When I select another city
    Then I should see the weather of the chosen city

  Scenario: Sort city in descending order
    Given I have list of cities
    When I sort by descending
    Then I should see the list of cities in descending order

  Scenario: Sort city in ascending order
    Given I have list of cities in descending order
    When I sort by ascending
    Then I should see the list of cities in ascending order