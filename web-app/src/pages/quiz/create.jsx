import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	ThemedHeader,
	Logo,
	HomeWrapper,
	TextScroller,
} from '../../components/styled';

const QuizCreate = (props) => {
	const controlValueChanged = (val) => {
		console.log(`onControlValueChanged : ${val}`);
	};

	return (
		<div className='h-full w-full overflow-hidden'>
			<div className='h-full flex flex-col bg-no-repeat bg-cover overflow-hidden'>
				<ThemedHeader className='flex'>
					<div className='flex-1'>
						<h1>
							Quiz
							<span>Create your own curiosity set</span>
						</h1>
					</div>

					<h1>
						<span></span>
					</h1>
				</ThemedHeader>
				<div className='w-full flex-1 p-4 block justify-center items-center bg-background  overflow-auto'>
					Placeholder
				</div>
			</div>
		</div>
	);
};

export default QuizCreate;
