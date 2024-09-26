import { useState, useEffect } from 'react';
import axios from 'axios';
import loadingIcon from './loading.gif';
import './AboutUs.css'

/**
 * A React component that represents the About Us page of the app.
 * Fetches data from the back-end server and displays it.
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);  // State to hold about us data
  const [loaded, setLoaded] = useState(false);  // track loading status
  const [error, setError] = useState('');  //  hold any error messages

  /**
   * Fetches About Us data from the back-end server
   */
  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        const data = response.data;  // Assuming the backend returns the about data directly
        setAboutData(data);
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)  
      });
  };

  // set up loading data from server when the component first loads
  useEffect(() => {
    fetchAboutData();
  }, []);  // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="AboutUs-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />}  {/* Loading icon while data is fetched */}

      {aboutData && (  // Render the data once it is available
        <>      
            <p><strong>{aboutData.name}</strong> </p>
            <div className="AboutUs-content">
                <p>{aboutData.bio}</p>  
            </div>  
            <img src={aboutData.imageUrl} alt="About Us" />                         
        </>
      )}
    </>
  );
};

// Export the component to be used in other files
export default AboutUs;
