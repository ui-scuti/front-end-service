import React, { useEffect } from 'react';
import { ActionTypes } from '../constants';
import { connect } from 'react-redux';
import {
	ThemedHeader,
	ThemedTextField,
	ThemedSubmitButton,
} from '../components/styled';
import * as _ from 'lodash';

import { ThemedCard } from '../components/styled';
import { setBranding } from '../services';
import ImageUploader from 'react-images-upload';

function Branding(props) {
	const [value, setValue] = React.useState(0);
	const [brandingData, setBrandingData] = React.useState(props.branding);

	useEffect(() => {}, []);

	const handleChange = (key, value) => {
		const b = _.clone(brandingData);
		b[key] = value;
		setBrandingData(b);
	};

	const onSave = () => {
		setBranding(brandingData).then((res) => {
			props.brandingUpdated(brandingData);
		});
	};

	return (
		<div className='w-full h-full'>
			<ThemedHeader>
				<h1>
					Branding
					<span>Customize your brand informations</span>
				</h1>
			</ThemedHeader>
			<ThemedCard className='p-1 w-full h-full'>
				<form id='a-form' method='' action='' className='flex flex-col '>
					<div className='grid grid-cols-2 flex-1'>
						<div className='flex w-full'>
							<div className='flex-1 p-4'>
								<label>Title</label>
							</div>
							<div className='flex-1 p-4'>
								<ThemedTextField
									type='text'
									placeholder='brand title'
									value={brandingData.title}
									onChange={(e) => handleChange('title', e.target.value)}
								/>
							</div>
						</div>

						<div className='flex w-full'>
							<div className='flex-1 p-4'>
								<label>Description</label>
							</div>
							<div className='flex-1 p-4'>
								<ThemedTextField
									type='text'
									placeholder='brand short description'
									value={brandingData.description}
									onChange={(e) => handleChange('description', e.target.value)}
								/>
							</div>
						</div>

						<div className='flex w-full'>
							<div className='flex-1 p-4'>
								<label>Small Logo</label>
							</div>
							<div className='flex-1 p-4'>
								<ImageUploader
									withIcon={true}
									withPreview={true}
									buttonText='Choose small logo'
									onChange={(e, x) => {
										handleChange('smalllogo', x[0]);
									}}
									imgExtension={['.jpg', '.gif', '.png', '.gif']}
									maxFileSize={5242880}
								/>
							</div>
						</div>

						<div className='flex w-full'>
							<div className='flex-1 p-4'>
								<label>Large Logo</label>
							</div>
							<div className='flex-1 p-4'>
								<ImageUploader
									withIcon={true}
									buttonText='Choose large logo'
									withPreview={true}
									onChange={(e, x) => {
										handleChange('largelogo', x[0]);
									}}
									imgExtension={['.jpg', '.gif', '.png', '.gif']}
									maxFileSize={5242880}
								/>
							</div>
						</div>
					</div>
					<div className='h-16 w-full flex justify-center items-center'>
						<div className='w-40'>
							<ThemedSubmitButton
								type='button'
								value='SAVE'
								onClick={() => onSave()}
							/>
						</div>
					</div>
				</form>
			</ThemedCard>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		branding: state.brandingReducer.branding,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		brandingUpdated: (branding) =>
			dispatch({ type: ActionTypes.BRANDING_UPDATED, branding: branding }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Branding);
