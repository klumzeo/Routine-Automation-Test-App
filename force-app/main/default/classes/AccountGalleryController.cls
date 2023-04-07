public with sharing class AccountGalleryController {

    @AuraEnabled
    public static ResultWrapper getAccounts() {
        List<Account> accountList = [
            SELECT Id, Name, Type, Account_Image__c, Number_of_Employees__c, Budget__c, Industry, Description,
                Owner.Name
            FROM Account
            WHERE CreatedDate > 2023-04-04T21:33:23.000+0000
        ];

        List<AccountWrapper> accountWrapperList = new List<AccountWrapper>();

        for (Account account : accountList) {
            accountWrapperList.add(
                new AccountWrapper(
                    account.Id,
                    account.Name,
                    account.Type,
                    account.Account_Image__c,
                    account.Industry,
                    account.Description,
                    account.Owner.Name,
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
        public String classValue;
        @AuraEnabled
        public String accountImage;
        @AuraEnabled
        public String industry;
        @AuraEnabled
        public String description;
        @AuraEnabled
        public String ownerName;
        @AuraEnabled
        public Decimal numberOfEmployees;
        @AuraEnabled
        public Decimal budget;

        public AccountWrapper(
            Id id,
            String name,
            String type,
            String accountImage,
            String industry,
            String description,
            String ownerName,
            Decimal numberOfEmployees,
            Decimal budget
        ) {
            this.id = id;
            this.name = name;
            this.type = type;
            this.accountImage = accountImage;
            this.industry = industry;
            this.description = description;
            this.ownerName = ownerName;
            this.numberOfEmployees = numberOfEmployees;
            this.budget = budget;
            this.classValue = 'tile slds-grid slds-grid_vertical';
        }
    }

    @TestVisible
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

    @TestVisible
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