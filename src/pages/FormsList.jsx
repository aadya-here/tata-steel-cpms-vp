import React, { useEffect, useState } from 'react';
import FormCard from '../components/info_cards/FormCard';
import Title from '../components/ui_components/Title';
import supabase from '../supabase';
import { useVendor } from '../context/vendorContext';
import { Button, Divider } from '@mui/joy';

const FormsList = () => {
    const [forms, setForms] = useState([]);
    const { vendorId } = useVendor();

    useEffect(() => {
        const fetchForms = async () => {
            const { data, error } = await supabase
                .from('forms_logs')
                .select(
                    `
                project_id,
                created_on,
                approval_status,
                form_num,
                form_id,
                form_log_id,
                projects!inner(
                    project_title
                ),
                forms_list!inner(
                    form_name
                )
            `,
                ).eq('vendor_id', vendorId)
                .order('created_on', { ascending: false });

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setForms(data);
                // console.log(data[0].form_log_id);
            }
        };

        fetchForms();
    }, [vendorId]);

    return (
        <div className="w-full min-h-screen bg-blue-50 p-5 flex flex-col items-center">
            <Title text="Filled Forms" />

            <div className="my-0 p-0 flex flex-col space-y-3 w-full sm:w-4/5 md:w-4/5 lg:w-full">
                {forms.map((form) => (
                    <FormCard
                        key={form.form_log_id}
                        projectName={form.projects?.project_title}
                        date={new Date(form.created_on).toLocaleDateString()}
                        formStatus={form.approval_status}
                        formName={form.forms_list?.form_name}
                        formLogId={form.form_log_id}
                        formId={form.form_id}
                    />
                ))}
            </div>
        </div>
    );
};

export default FormsList;
