import { useState } from 'react'

export function PersonState() {
	const initPerson = {
        firstName: "John",
        lastName: "Doe",
        age: 100
    };
    const [person, setPerson] = useState(initPerson);

    function handleIncreaseAge() {
        // copy the existing person object into a new object
        const newPerson = { ...person, age: person.age + 1 };
        setPerson(newPerson);
    };

	// When a callback is passed to the setState function, it ensures that the latest state is passed in as an argument to the callback.
	// So if you want to change a value multiple times in one state updater func, do this:
	function handleIncreaseAge2() {
		setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
		setPerson((prevPerson) => ({ ...prevPerson, age: prevPerson.age + 1 }));
	};


	const [fName, setFName] = useState(person.firstName);
	function handleFirstNameChange(val) {
		const newPerson = { ...person, firstName: val };
		setFName(val);
		setPerson(newPerson);
	}
	const [lName, setLName] = useState(person.lastName);
	function handleLastNameChange(val) {
		const newPerson = { ...person, lastName: val };
		setLName(val);
		setPerson(newPerson);
	}
	

    return (
        <div id='personState'>
            <h1>{person.firstName}</h1>
            <h1>{person.lastName}</h1>
            <h2>{person.age}</h2>

            <button onClick={handleIncreaseAge}>Increase age</button>
            <button onClick={handleIncreaseAge2}>Increase age 2x</button>
            <input
                type="text"
                value={fName}
                onChange={(e) => handleFirstNameChange(e.target.value)}
                placeholder='First Name goes here'
            />
            <input
                type="text"
                value={lName}
                onChange={(e) => handleLastNameChange(e.target.value)}
                placeholder='Last Name goes here'
            />
        </div>
    );
}
