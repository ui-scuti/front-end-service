import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	ThemedHeader,
	Logo,
	HomeWrapper,
	TextScroller,
} from '../components/styled';

import './home.css';
function Home(props) {
	return (
		<div className='h-full w-full overflow-hidden'>
			<div className='h-full flex flex-col bg-no-repeat bg-cover overflow-hidden'>
				<ThemedHeader className='flex'>
					<div className='flex-1'>
						<h1>
							The Challenger
							<span>Welcome to the ground</span>
						</h1>
					</div>

					<h1>
						<span></span>
					</h1>
				</ThemedHeader>
				<HomeWrapper className='h-full w-full flex flex-col mx-1.5'>
					<div className='flex-1 flex justify-center items-center'>
						<div className='text-1xl text-gray-300 font-mono font-light flex '>
							<div className='flex flex-col justify-center items-center uppercase '>
								<Logo />
								<div className='tracking-wild'>
									Don't limit your challenges.
								</div>
								<div>
									<Link to='/challenges/home/'>Challenge</Link> your limit
								</div>
							</div>
						</div>
					</div>
					<div className='flex justify-center items-center h-40'>
						<TextScroller>
							<p>Challenge your</p>
							<b>
								<div>
									Javascript
									<br />
									Node
									<br />
									Typescript
									<br />
									ReactJS
									<br />
									UI
									<br />
								</div>
							</b>
						</TextScroller>
					</div>
				</HomeWrapper>
			</div>

			{/* <div className="card">
        <div className="box">
          <div className="content">
            <h3>Challenge</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia doloribus tenetur rem nesciunt minima id asperiores quisquam ex voluptatibus!</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="box">
          <div className="content">
            <h3>Testcases</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia doloribus tenetur rem nesciunt minima id asperiores quisquam ex voluptatibus!</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="box">
          <div className="content">
            <h3>Validation</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia doloribus tenetur rem nesciunt minima id asperiores quisquam ex voluptatibus!</p>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="box">
          <div className="content">
            <h3>Scoring</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia doloribus tenetur rem nesciunt minima id asperiores quisquam ex voluptatibus!</p>
          </div>
        </div>
      </div> */}
		</div>
	);
}

export default Home;
