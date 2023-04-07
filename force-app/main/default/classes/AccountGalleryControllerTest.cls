
@isTest
private class AccountGalleryControllerTest {

    @TestSetup
    static void setupTestData() {
        Account testAcc = new Account(
            Name = 'Test Account 1'
        );

        insert testAcc;
    }

    @isTest
    private static void testgetAccount() {
        AccountGalleryController.ResultWrapper result;

        List<Account> testAccs = [SELECT Name FROM Account];

        Test.startTest();
        result = AccountGalleryController.getAccounts();
        Test.stopTest();

        System.assertEquals(result.accountList.size(), testAccs.size(), 'Wrong amount of Accounts returned');
        System.assertEquals(result.accountList[0].id, testAccs[0].Id, 'Wrong Account returned');
    }
}