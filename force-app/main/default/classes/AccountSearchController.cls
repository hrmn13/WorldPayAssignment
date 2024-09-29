public with sharing class AccountSearchController {
    @AuraEnabled
    public static List<Account> searchAccounts(String searchTerm) {
        List<Account> accList = new List<Account>();
        
        if(String.isNotBlank(searchTerm)){
            String searchPattern = '%' + searchTerm + '%';
        	accList = [SELECT Id, Name,Industry,Phone FROM Account WHERE Name LIKE :searchPattern OR Phone LIKE :searchPattern OR Industry LIKE :searchPattern];
        }
        
        return accList;
    }

    @AuraEnabled
    public static Map<String, Object> getRelatedData(Id accountId) {
        Map<String, Object> response = new Map<String, Object>();
        
        Account selectedAccount = [SELECT Id, Name,
                                   (SELECT Id,Title, Name,Email,Phone FROM Contacts),
                                   (SELECT Id,CaseNumber, Subject,Origin,Status FROM Cases) 
                                   FROM Account WHERE Id = :accountId];
        
        response.put('account', selectedAccount);
        response.put('contacts', selectedAccount.Contacts);
        response.put('cases', selectedAccount.Cases);
        return response;
    }
}