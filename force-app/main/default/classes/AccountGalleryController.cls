public with sharing class AccountGalleryController {

    @AuraEnabled
    public static AccountWrapper getAccountByType() {
        List<Account> accountList = [
            SELECT Id, Name, Type, Account_Image__c, Number_of_Employees__c, Budget__c
            FROM Account
            WHERE Number_of_Employees__c != null
            LIMIT 5
        ];

        List<AccountType> accountTypes = getAccountTypes();

        accountTypes.add(
            0, new AccountType('All Types', 'All')
        );

        return new AccountWrapper(accountList, accountTypes);
    }

    private static List<AccountType> getAccountTypes() {
        List<AccountType> pickListValueList = new List<AccountType>();

        for (Schema.PicklistEntry accountType : Account.Type.getDescribe().getPicklistValues()) {
            pickListValueList.add(
                new AccountType(accountType.getLabel(), accountType.getValue())
            );
        }

        return pickListValueList;
    }

    public class AccountWrapper {
        @AuraEnabled
        public List<Account> accountList;
        @AuraEnabled
        public List<AccountType> accountTypes;

        public AccountWrapper(List<Account> accountList, List<AccountType> accountTypes) {
            this.accountList = accountList;
            this.accountTypes = accountTypes;
        }
    }

    public class AccountType {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String value;

        public AccountType(String label, String value) {
            this.label = label;
            this.value = value;
        }
    }
}