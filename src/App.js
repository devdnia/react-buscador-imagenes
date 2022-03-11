import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import './headers.css';
import './content.css';
import './article.css';


function App() {
  const [ photos, setPhotos ] = useState([])

  const open = url => window.open( url );
  // console.log({ photos });
  return (
    <>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async (values) => {
            const response = await fetch(
              `https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID tu apiKey'
              }
            })
            const data = await response.json()
            // console.log(data);
            setPhotos( data.results );
          }}
        >
          <Form>
            <Field name="search" />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
            { photos.map( photo => 
              <article key={ photo.id } onClick={ () => open( photo.links.htlm )}>
                <img  src={ photo.urls.regular }/>
                <p>{[ photo.description, photo.alt_description].join(' - ')}</p>
              </article>
              )}
        </div>
      </div>
    </>
  );
}

export default App;



