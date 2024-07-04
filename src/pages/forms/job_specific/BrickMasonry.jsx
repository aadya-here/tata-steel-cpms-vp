import React, { useState } from 'react';
import supabase from '../../../supabase'; // Make sure to set up Supabase client

import InputField from '../../../components/InputField';
import CheckListItem from '../../../components/CheckListItem';
import locationIcon from '../../../assets/location.png'; // Ensure you have these icons in your assets
import SubmitButton from '../../../components/PrimaryButton';
import { useVendor } from '../../../context/vendorContext';
import Title from '../../../components/Title';

import { addFormLog } from '../../../helpers/addFormLog';
import ProjectSelectionMenu from '../../../components/ProjectSelection';
// import ProjectDropdown from '../../../components/ProjectDropdown';

const BrickMasonryQCForm = () => {

    const { vendorId } = useVendor();

    const [projectID, setProjectID] = useState('');
    const [structure, setStructure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [refDrgNo, setRefDrgNo] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const [availabilityOfBricks, setAvailabilityOfBricks] = useState('');
    const [cleaningWorkArea, setCleaningWorkArea] = useState('');
    const [alignmentLocationMasonry, setAlignmentLocationMasonry] = useState('');
    const [suitabilitySafetyScaffolding, setSuitabilitySafetyScaffolding] = useState('');
    const [wettingBricksBeforePlacing, setWettingBricksBeforePlacing] = useState('');
    const [mortarMixProportionJointThickness, setMortarMixProportionJointThickness] = useState('');
    const [bricksLaidWithFrogsUp, setBricksLaidWithFrogsUp] = useState('');
    const [dimensionsPlumbLevelsAngles, setDimensionsPlumbLevelsAngles] = useState('');
    const [bondBetweenOldNewMasonry, setBondBetweenOldNewMasonry] = useState('');
    const [staggeringVerticalJoints, setStaggeringVerticalJoints] = useState('');
    const [sizesOpeningsDoorsWindows, setSizesOpeningsDoorsWindows] = useState('');
    const [cleaningRakingJoints, setCleaningRakingJoints] = useState('');
    const [curingOldMasonry, setCuringOldMasonry] = useState('');
    const [removalOfDebris, setRemovalOfDebris] = useState('');
    const [noOfCoursesRestricted, setNoOfCoursesRestricted] = useState('');
    const [mixProportion, setMixProportion] = useState('');
    const [supervisor_name, setSupervisorName] = useState('');
    const [supervisor_pno, setSupervisorPno] = useState(null);
    const [selectedProject, setSelectedProject] = useState('');


    const form_num = 4;

    const handleSubmit = async () => {
        try {
            const { data, error } = await supabase
                .from('form_brick_masonry_qc')
                .insert([
                    {
                        project_id: parseInt(projectID),
                        structure: structure,
                        date: new Date(),
                        quantity: parseInt(quantity),
                        ref_drg_no: refDrgNo,
                        location: location,
                        form_num: form_num,
                        description: description,
                        availability_of_bricks: availabilityOfBricks,
                        cleaning_work_area: cleaningWorkArea,
                        alignment_location_masonry: alignmentLocationMasonry,
                        suitability_safety_scaffolding: suitabilitySafetyScaffolding,
                        wetting_bricks_before_placing: wettingBricksBeforePlacing,
                        mortar_mix_proportion_joint_thickness: mortarMixProportionJointThickness,
                        bricks_laid_with_frogs_up: bricksLaidWithFrogsUp,
                        dimensions_plumb_levels_angles: dimensionsPlumbLevelsAngles,
                        bond_between_old_new_masonry: bondBetweenOldNewMasonry,
                        staggering_vertical_joints: staggeringVerticalJoints,
                        sizes_openings_doors_windows: sizesOpeningsDoorsWindows,
                        cleaning_raking_joints: cleaningRakingJoints,
                        curing_old_masonry: curingOldMasonry,
                        removal_of_debris: removalOfDebris,
                        no_of_courses_restricted: noOfCoursesRestricted,
                        supervisor_name: supervisor_name,
                        supervisor_pno: supervisor_pno
                    }
                ]).select();

            if (error) {
                alert('Error', error.message);
            } else {

                alert('Brick Masonry QC checklist submitted successfully.');
                // console.log('added log:', data[0].log_id);
                return (data[0].log_id);

            }
        } catch (error) {
            console.error('Error submitting checklist:', error);
            alert('Error', error.message);
        }
    };

    const handleFormLog = async () => {
        try {
            const formID = await handleSubmit();
            await addFormLog(formID, projectID, vendorId, form_num);
            console.log('form:', formID);
        } catch (error) {
            console.error('Error creating form log:', error);
            alert('Error', error.message);
        }
    };


    const [selectedProjectId, setSelectedProjectId] = useState('');

    const handleProjectChange = (projectId) => {
        setSelectedProjectId(projectId);
        console.log('selected proj', selectedProject)
        // You can perform any other actions related to project change here
    };

    return (
        <div className='bg-blue-50 pb-20 p-5'>
            <Title text="Brick Masonry QC Checklist" />

            <div className='items-center justify-center flex flex-col'>
                <InputField icon={locationIcon} placeholder="Project ID" handleInputChange={setProjectID} />
                {/* <ProjectSelectionMenu handleProjectChange={handleProjectChange} /> */}
                <InputField icon={locationIcon} placeholder="Structure" handleInputChange={setStructure} />
                <InputField icon={locationIcon} placeholder="Quantity" handleInputChange={setQuantity} />
                <InputField icon={locationIcon} placeholder="Ref Drg No." handleInputChange={setRefDrgNo} />
                <InputField icon={locationIcon} placeholder="Location" handleInputChange={setLocation} />
                <InputField icon={locationIcon} placeholder="Description" handleInputChange={setDescription} />
                <InputField icon={locationIcon} placeholder="Supervisor Name" handleInputChange={setSupervisorName} />
                <InputField icon={locationIcon} placeholder="Supervisor GatePass No." handleInputChange={setSupervisorPno} />

            </div>

            <CheckListItem label="Availability of bricks as per daily requirements" value={availabilityOfBricks} setValue={setAvailabilityOfBricks} />
            <CheckListItem label="Cleaning of work area" value={cleaningWorkArea} setValue={setCleaningWorkArea} />
            <CheckListItem label="Alignment and location of masonry" value={alignmentLocationMasonry} setValue={setAlignmentLocationMasonry} />
            <CheckListItem label="Suitability and safety of scaffolding" value={suitabilitySafetyScaffolding} setValue={setSuitabilitySafetyScaffolding} />
            <CheckListItem label="Wetting of bricks before placing" value={wettingBricksBeforePlacing} setValue={setWettingBricksBeforePlacing} />
            <CheckListItem label="Mortar mix proportion and joint thickness" value={mortarMixProportionJointThickness} setValue={setMortarMixProportionJointThickness} />
            <CheckListItem label="Bricks laid with frogs up" value={bricksLaidWithFrogsUp} setValue={setBricksLaidWithFrogsUp} />
            <CheckListItem label="Dimensions, plumb levels, and angles" value={dimensionsPlumbLevelsAngles} setValue={setDimensionsPlumbLevelsAngles} />
            <CheckListItem label="Bond between old and new masonry" value={bondBetweenOldNewMasonry} setValue={setBondBetweenOldNewMasonry} />
            <CheckListItem label="Staggering of vertical joints" value={staggeringVerticalJoints} setValue={setStaggeringVerticalJoints} />
            <CheckListItem label="Sizes of openings for doors and windows" value={sizesOpeningsDoorsWindows} setValue={setSizesOpeningsDoorsWindows} />
            <CheckListItem label="Cleaning and raking of joints" value={cleaningRakingJoints} setValue={setCleaningRakingJoints} />
            <CheckListItem label="Curing of old masonry" value={curingOldMasonry} setValue={setCuringOldMasonry} />
            <CheckListItem label="Removal of debris" value={removalOfDebris} setValue={setRemovalOfDebris} />
            <CheckListItem label="Number of courses restricted per day" value={noOfCoursesRestricted} setValue={setNoOfCoursesRestricted} />
            <CheckListItem label="Mix proportion" value={mixProportion} setValue={setMixProportion} />

            <SubmitButton handleSubmit={handleFormLog} text="Submit" />
        </div>
    );
};

export default BrickMasonryQCForm;
