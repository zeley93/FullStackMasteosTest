import React, { useState } from 'react'
import {MDBBtn, MDBInput, MDBAlert, MDBCol, MDBRow} from 'mdbreact'

function IsEven () {

	const [isEven, setIsEven] = useState(0)
	const [result, setResult] = useState(0)
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		const payload = {isEven}

		fetch('http://localhost:8080/isNumberEven', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		})
			.then((res) => res.json())
			.then((res) => {
				setIsLoaded(true)
				setResult(res)
			}, (error) => {
				setIsLoaded(true)
				setError(error)
			})
		if(error){
			console.log(error)
			console.log(isLoaded)
		}
	}

	return (
	<MDBRow>
		<MDBCol lg="5">
			<form onSubmit={handleSubmit} className="form">
				<MDBRow>
					<MDBCol md="8">
						<MDBInput 
							label="type your number here"
							type="number" 
							required 
							value={isEven}
							onChange={(e) => setIsEven(e.target.value)}
						/>
					</MDBCol>
					<MDBCol md="2">
						<MDBBtn type="submit" color="primary" size="lg" className="waves-light" color="elegant">Go</MDBBtn>
					</MDBCol>
					<MDBRow>
						<MDBCol >
							{result != 0 ?
							<MDBAlert color="primary" >
									Result : {result ? "Its Even" : "Its Odd"}
							</MDBAlert>
							:""}
						</MDBCol>
					</MDBRow>
				</MDBRow>
			</form>
		</MDBCol>
	</MDBRow>
	)
}
 
export default IsEven

