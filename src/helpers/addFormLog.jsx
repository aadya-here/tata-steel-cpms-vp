import supabase from '../supabase';  // Adjust the import according to your setup
import moment from 'moment';
import { getUserId } from './fetchUser';  // Adjust the import according to your setup
// import React from 'react';

export const addFormLog = async (formID, projectID, vendorId, form_num) => {
    try {
        // This should trigger handleSubmit to submit the form
        const userId = await getUserId();
        if (!formID || !userId) return;  // If handleSubmit or getUserId failed, stop here

        const { data, error } = await supabase
            .from('forms_logs')
            .insert([
                {
                    project_id: parseInt(projectID),
                    vendor_id: vendorId,
                    form_id: formID,
                    created_by: userId,
                    created_on: moment().toISOString(),
                    form_num: form_num
                }
            ]).select();

        if (error) {
            throw error;
        }

        console.log('formID : ', formID);
        // alert('Form log inserted successfully.');

        return data;
    } catch (error) {
        alert('Error', error.message);
        console.error("Error logging form submission:", error);
    }
};