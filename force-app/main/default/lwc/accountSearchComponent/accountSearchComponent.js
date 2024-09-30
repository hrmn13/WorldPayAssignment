import { LightningElement, track } from 'lwc';
import searchAccounts from '@salesforce/apex/AccountSearchController.searchAccounts';
const DELAY=1000;

export default class AccountSearchComponent extends LightningElement {
    
    showContacts = false;
    showCases = false;
    delayTimeOut=null;
    @track contacts = [];
    @track cases = [];
    @track accounts = [];
    @track selectedAccount = {
        'selectedAccountId' : null,
        'selectedAccountName' : ''
    }

    handleSearch(event) {
        
        window.clearTimeout(this.delayTimeOut);
        const searchTerm = event.target.value;

        //debouncing
        let delayTimeOut = setTimeout(() => {
             searchAccounts({ searchTerm })
            .then((result) => {
                this.accounts = result;
            })
            .catch((error) => {
                console.error('Error searching accounts:', error);
            });
        }, DELAY);
    }

    choiceSelectionHandler(event){
        let selectedRecord = event.currentTarget.dataset.item;
        
        let outputRecord = this.accounts.find((currItem)=>
                currItem.Id == selectedRecord
        )

        this.selectedAccount = {
            'selectedAccountId' : outputRecord.Id,
            'selectedAccountName' : outputRecord.Name
        } 
    }

    get isAccountSelected(){
        return this.selectedAccount.selectedAccountId == null ? false : true;
    }

    removeSelectionHandler(){
        this.selectedAccount = {
            'selectedAccountId' : null,
            'selectedAccountName' : ''
        }

        this.accounts = null;
    }
}