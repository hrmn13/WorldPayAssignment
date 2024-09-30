import { LightningElement, api, track } from 'lwc';
import getRelatedData from '@salesforce/apex/AccountSearchController.getRelatedData';
const contactColumn = [
    {label : 'Contact Name', fieldName : 'Name'},
    {label : 'Contact Title', fieldName : 'Title'},
    {label : 'Contact Phone', fieldName : 'Phone'},
    {label : 'Contact Email', fieldName : 'Email'}
];

const caseColumn = [
    {label : 'Case Number', fieldName : 'CaseNumber'},
    {label : 'Case Subject', fieldName : 'Subject'},
    {label : 'Case Origin', fieldName : 'Origin'},
    {label : 'Case Status', fieldName : 'Status'}
];

export default class RelatedList extends LightningElement {
    conColList = contactColumn;
    caseColList = caseColumn;
    @api accountId; // Input property
    @track contacts = [];
    @track cases = [];
    
    activeSections = ['contacts', 'cases'];

    // Watch for accountId change to fetch data
    connectedCallback() {
        this.fetchRelatedData();
    }

    fetchRelatedData() {
        getRelatedData({ accountId: this.accountId })
            .then((result) => {
                this.contacts = result.contacts;
                this.cases = result.cases;
            })
            .catch((error) => {
                console.error('Error fetching related data:', error);
            });
    }

    get isContactsAvailable(){
        return this.contacts.length > 0 ? true : false;
    }

    get isCasesAvailable(){
        return this.cases.length > 0 ? true : false;
    }
}
