import { useId, useState } from 'react'

export default function Form({ getRes }) {

    const inputIds = {
        myName: useId(),
        recipientName: useId(),
        recipientTitle: useId(),
        myIntent: useId(),
        mySkills: useId(),
        myDesiredOutcome: useId()
    };

    const [formData, setFormData] = useState({
        myName: '',
        recipientName: '',
        recipientTitle: '',
        myIntent: '',
        mySkills: '',
        myDesiredOutcome: ''
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // plain object:
        const formJson = Object.fromEntries(formData.entries());
        getRes(formJson);
    }
  return (
    <form method="post" onSubmit={handleSubmit}>
        <div className='input-wrapper'>
            <label htmlFor={inputIds.myName}>Name</label>
            <input 
                id={inputIds.myName} 
                name="myName" 
                placeholder="John Doe"
                value={formData.myName}
                onChange={handleChange}
            />
        </div>
        
        <div className='input-wrapper'>
            <label htmlFor={inputIds.recipientName}>Name of the person you are writing to</label>
            <input 
                id={inputIds.recipientName} 
                name="recipientName" 
                placeholder="Elon Musk"
                value={formData.recipientName}
                onChange={handleChange}
            />
        </div>

        <div className='input-wrapper'>
            <label htmlFor={inputIds.recipientTitle}>What do they do?</label>
            <input 
                id={inputIds.recipientTitle} 
                name="recipientTitle" 
                placeholder="Founder, Tesla"
                value={formData.recipientTitle}
                onChange={handleChange}
            />
        </div>

        <div className='input-wrapper'>
            <label htmlFor={inputIds.myIntent}>What are you writing to them?</label>
            <input 
                id={inputIds.myIntent} 
                name="myIntent" 
                placeholder="Apply for a job at Tesla"
                value={formData.myIntent}
                onChange={handleChange}
            />
        </div>

        <div className='input-wrapper'>
            <label htmlFor={inputIds.mySkills}>What is your designation/skills?</label>
            <input 
                id={inputIds.mySkills} 
                name="mySkills" 
                placeholder="Write about yourself to add credibility to the mail"
                value={formData.mySkills}
                onChange={handleChange}
            />
        </div>

        <div className='input-wrapper'>
            <label htmlFor={inputIds.myDesiredOutcome}>What action do you want them to take after the email?</label>
            <input 
                id={inputIds.myDesiredOutcome} 
                name="myDesiredOutcome" 
                placeholder="Give a 30 min slot to explore opportunities"
                value={formData.myDesiredOutcome}
                onChange={handleChange}
            />
        </div>

        <button type="submit">Craft my Cold Email</button>
    </form>
  )
}
