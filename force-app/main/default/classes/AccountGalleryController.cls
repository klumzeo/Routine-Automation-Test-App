public with sharing class AccountGalleryController {

    @AuraEnabled
    public static ResultWrapper getAccountByType() {
        List<Account> accountList = [
            SELECT Id, Name, Type, Account_Image__c, Number_of_Employees__c, Budget__c
            FROM Account
            WHERE Number_of_Employees__c != null
            LIMIT 5
        ];

        List<AccountWrapper> accountWrapperList = new List<AccountWrapper>();

        for (Account account : accountList) {
            accountWrapperList.add(
                new AccountWrapper(
                    account.Id,
                    account.Name,
                    account.Type,
                    account.Account_Image__c,
                    account.Number_of_Employees__c,
                    account.Budget__c
                )
            );
        }

        List<AccountType> accountTypes = getAccountTypes();

        accountTypes.add(
            0, new AccountType('All Types', 'All')
        );

        return new ResultWrapper(accountWrapperList, accountTypes);
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
        public Id id;
        @AuraEnabled
        public String name;
        @AuraEnabled
        public String type;
        @AuraEnabled
        public String accountImage;
        @AuraEnabled
        public String classValue;
        @AuraEnabled
        public Decimal numberOfEmployees;
        @AuraEnabled
        public Decimal budget;

        public AccountWrapper(
            Id id,
            String name,
            String type,
            String accountImage,
            Decimal numberOfEmployees,
            Decimal budget
        ) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.accountImage = accountImage;
            this.numberOfEmployees = numberOfEmployees;
            this.budget = budget;
            this.classValue = 'tile slds-grid slds-grid_vertical';
        }
    }

    public class ResultWrapper {
        @AuraEnabled
        public List<AccountWrapper> accountList;
        @AuraEnabled
        public List<AccountType> accountTypes;

        public ResultWrapper(List<AccountWrapper> accountList, List<AccountType> accountTypes) {
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