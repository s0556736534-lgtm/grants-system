import { BankDetails } from "./BankDetails"
import { FamilyDetails } from "./FamilyDetails"
import { LearnDetails } from './LearnDetails'
import { MultiForm } from "./MultiForm"
import { PersonalDetails } from "./PersonalDetails"
import {Submit} from './Submit'
import './styleForms.css';

export const LayOut = () => {
    return <>
        <MultiForm>
            <PersonalDetails></PersonalDetails>
            <FamilyDetails></FamilyDetails>
            <LearnDetails></LearnDetails>
            <BankDetails></BankDetails>
            <Submit></Submit>
        </MultiForm>
    </>
}