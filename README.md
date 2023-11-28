**Test case ID:** TC\_Login\_01

**Test case description:** To test whether the login is successful with the correct user and password

**Positive/negative:** Positive

**Test steps:** 

1.  Type “John Doe” in the Username field
2.  Type "ThisIsNotAPassword" in the Password field
3.  Click on the Login button

**Test data:** "John Doe", "ThisIsNotAPassword"

**Expected result:** Successful login to the site

**Actual result:** Successful login to the site

**Test case ID:** TC\_Login\_02

**Test case description:** To test whether an error message appears when using an incorrect username and password

P**ositive/negative:** Negative

**Test steps:** 

1.  Type “John” in the Username field
2.  Type "ThisIsNot" in the Password field
3.  Click on the Login button

**Test data:** “John”, "ThisIsNot"

**Expected result:** Unsuccessful login to the site, an error message appears

**Actual result:** Unsuccessful login to the site, error message appears ("Login failed! Please ensure the username and password are valid.")

**Test case ID:** TC\_Login\_03

**Test case description:** To test whether an error message appears when using an incorrect username and correct password

P**ositive/negative:** Negative

**Test steps:** 

1.  Type “John” in the Username field
2.  Type "ThisIsNotAPassword" in the Password field
3.  Click on the Login button

**Test data:** “John”, "ThisIsNotAPassword"

**Expected result:** Unsuccessful login to the site, an error message appears

**Actual result:** Unsuccessful login to the site, error message appears ("Login failed! Please ensure the username and password are valid.")

**Test case ID:** TC\_Login\_04

**Test case description:** To test whether an error message appears when using an incorrect username and correct password

P**ositive/negative:** Negative

**Test steps:** 

1.  Type “John Doe” in the Username field
2.  Type "ThisIsNot" in the Password field
3.  Click on the Login button

**Test data:** “John Doe”, "ThisIsNot"

**Expected result:** Unsuccessful login to the site, an error message appears

**Actual result:** Unsuccessful login to the site, error message appears ("Login failed! Please ensure the username and password are valid.")
