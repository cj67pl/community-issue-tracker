import React from 'react'
import { useState } from 'react'

import Issues from './Components/IssuesList/IssuesList.jsx'
import Dashboard from './Components/Dashboard/Dashboard.jsx'
import './App.css'

function App() {
 

  return (
    <>
		
		<div className='min-h-screen bg-white text-slate-900 '>
			{/* SIDEBAR */}
			
			<aside className='fixed inset-y-0 left-0 w-62 border-r border-slate-200 bg-white '>
				{/* Logo */}
				  <div className="flex h-20 items-center p-6 border-b border-slate-200">
					<div className='flex bg-teal-700 w-5 h-5 p-4 justify-center items-center rounded-lg'>
						<span className='text-lg font-bold text-neutral-100 '>T</span>
					</div>
					<div className='p-3'>
						<h1 className='font-bold text-xl'>
							Tugon
						</h1>
						  <p className=' font-thin text-[11px] text-olive-400'>Report. Respond. Resolve</p>
					</div>
				</div>

				{/* Navigation */}
				<nav className='p-3 py-5'>
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-semibold text-green-800 bg-green-700/10' href="">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							fill="currentColor" viewBox="0 0 24 24" >
							{/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							<path d="M20 11h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1m-1 8h-4v-6h4zm-9-4H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1m-1 4H5v-2h4zM20 3h-6c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 4h-4V5h4zm-9-4H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1m-1 8H5V5h4z"></path>
						</svg>
						Dashboard
					</a>
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10' href="">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							fill="currentColor" viewBox="0 0 24 24" >
							{/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							<path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2M6 20V4h12v16z"></path><path d="M8 12h8v2H8zm0 4h8v2H8zM8 6h4v4H8z"></path>
						</svg>
						Issues
					</a>
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10' href="">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							fill="currentColor" viewBox="0 0 24 24" >
							{/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							<path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path>
						</svg>
						Report Issues
					</a>

					<div className='border-b border-slate-200 px-5 '></div>
					
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10' href="">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							fill="currentColor" viewBox="0 0 24 24" >
							{/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							<path d="M12 2C6.58 2 2 6.58 2 12s4.58 10 10 10 10-4.58 10-10S17.42 2 12 2m0 18c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8-3.66 8-8 8"></path><path d="M13 7h-2v6h6v-2h-4z"></path>
						</svg>
						Reports
					</a>

				</nav>

				

				{/* Settings */}
				<div className='p-3 absolute w-full bottom-0 border-t border-slate-200'>
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10' href="">
						  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							  fill="currentColor" viewBox="0 0 24 24" >
							  {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m0 6c-1.08 0-2-.92-2-2s.92-2 2-2 2 .92 2 2-.92 2-2 2"></path><path d="m20.42 13.4-.51-.29c.05-.37.08-.74.08-1.11s-.03-.74-.08-1.11l.51-.29c.96-.55 1.28-1.78.73-2.73l-1-1.73a2.006 2.006 0 0 0-2.73-.73l-.53.31c-.58-.46-1.22-.83-1.9-1.11v-.6c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v.6c-.67.28-1.31.66-1.9 1.11l-.53-.31c-.96-.55-2.18-.22-2.73.73l-1 1.73c-.55.96-.22 2.18.73 2.73l.51.29c-.05.37-.08.74-.08 1.11s.03.74.08 1.11l-.51.29c-.96.55-1.28 1.78-.73 2.73l1 1.73c.55.95 1.77 1.28 2.73.73l.53-.31c.58.46 1.22.83 1.9 1.11v.6c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-.6a8.7 8.7 0 0 0 1.9-1.11l.53.31c.95.55 2.18.22 2.73-.73l1-1.73c.55-.96.22-2.18-.73-2.73m-2.59-2.78c.11.45.17.92.17 1.38s-.06.92-.17 1.38a1 1 0 0 0 .47 1.11l1.12.65-1 1.73-1.14-.66c-.38-.22-.87-.16-1.19.14-.68.65-1.51 1.13-2.38 1.4-.42.13-.71.52-.71.96v1.3h-2v-1.3c0-.44-.29-.83-.71-.96-.88-.27-1.7-.75-2.38-1.4a1.01 1.01 0 0 0-1.19-.15l-1.14.66-1-1.73 1.12-.65c.39-.22.58-.68.47-1.11-.11-.45-.17-.92-.17-1.38s.06-.93.17-1.38A1 1 0 0 0 5.7 9.5l-1.12-.65 1-1.73 1.14.66c.38.22.87.16 1.19-.14.68-.65 1.51-1.13 2.38-1.4.42-.13.71-.52.71-.96v-1.3h2v1.3c0 .44.29.83.71.96.88.27 1.7.75 2.38 1.4.32.31.81.36 1.19.14l1.14-.66 1 1.73-1.12.65c-.39.22-.58.68-.47 1.11Z"></path>
						  </svg>
						Settings
					</a>
					  <a className='flex mb-1 items-center gap-3 rounded-lg  px-3 py-3 text-sm font-medium text-neutral-600 hover:text-neutral-950 hover:bg-green-200/10' href="">
						  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
							  fill="currentColor" viewBox="0 0 24 24" >
							  {/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
							  <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"></path><path d="M11 16h2v2h-2zm2.27-9.75c-2.08-.75-4.47.35-5.21 2.41l1.88.68c.18-.5.56-.9 1.07-1.13s1.08-.26 1.58-.08a2.01 2.01 0 0 1 1.32 1.86c0 1.04-1.66 1.86-2.24 2.07-.4.14-.67.52-.67.94v1h2v-.34c1.04-.51 2.91-1.69 2.91-3.68a4.015 4.015 0 0 0-2.64-3.73"></path>
						  </svg>
						Help
					</a>
				</div>


			</aside>
			
			<div className='ml-62'>
				{/* Top Bar */}
				<header className='flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8'>

					{/* Search */}
					
					  <div className="
							flex h-8 w-72
							items-center
							rounded-lg
							border border-slate-200
							transition
							focus-within:border-green-700
							focus-within:ring-2
							focus-within:ring-green-700/20
							">
						<input
							type="text"
							placeholder="Search for Issues"
							className="
							h-full w-full
							bg-transparent
							px-3
							text-xs
							outline-none
							placeholder:text-slate-400/60
							"
						/>

						<button
							type="button"
							className="
							flex h-full
							items-center justify-center
							border-l border-slate-200
							px-3
							text-green-800
							transition-colors
							hover:bg-green-50
							hover:rounded-r-lg
							active:bg-teal-700
							active:text-white
							active:rounded-r-lg
    						"						
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M18 10c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8c1.85 0 3.54-.63 4.9-1.69l5.1 5.1L21.41 20l-5.1-5.1A8 8 0 0 0 18 10M4 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6" />
							</svg>
						</button>
					</div>


					{/* Right Side */}
					<div className='flex items-center gap-5 ms-auto'>
						<button className='rounded-lg p-1 border border-slate-200 hover:bg-green-50
							hover:rounded-r-lg
							active:bg-teal-700
							active:text-white
							relative'>
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
								fill="currentColor" viewBox="0 0 24 24" >
								{/* <!--Boxicons v3.0.8 https://boxicons.com | License  https://docs.boxicons.com/free--> */}
								<path d="M19 12.59V10c0-3.22-2.18-5.93-5.14-6.74C13.57 2.52 12.85 2 12 2s-1.56.52-1.86 1.26C7.18 4.08 5 6.79 5 10v2.59L3.29 14.3a1 1 0 0 0-.29.71v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-2c0-.27-.11-.52-.29-.71zM19 16H5v-.59l1.71-1.71a1 1 0 0 0 .29-.71v-3c0-2.76 2.24-5 5-5s5 2.24 5 5v3c0 .27.11.52.29.71L19 15.41zm-4.18 4H9.18c.41 1.17 1.51 2 2.82 2s2.41-.83 2.82-2"></path>
							</svg>
							  <span class="dot absolute top-[3px] right-[4px] w-[7px] h-[7px] rounded-full bg-red-600 border-2 border-white"></span>
						</button>
						{/* <div></div> */}

						  <div className='flex  group items-center gap-3 rounded-4xl p-1 pr-2 border border-slate-200 
							active:bg-teal-700
							active:text-white
							cursor-pointer'>
							  <div className='rounded-3xl p-2 bg-teal-700 text-white font-bold
							  	group-active:bg-white
								group-active:text-green-700'>
								TC
							</div>
							<div className='flex flex-col px-1'>
								<span className='font-semibold'>Tom Cook</span>
								  <span className=' font-thin text-[11px] text-olive-400'>Coordinator</span>
							</div>
							
						</div>
						

					</div>
					<div></div>
				</header>

				{/* Main Content */}
				<Dashboard />
				<Issues />
			</div>

		</div>
    </>
  )
}

export default App
