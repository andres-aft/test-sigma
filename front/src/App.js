import React from 'react';
import logo from './logo.png';
import imageApp from './sigma-image.png';
import './App.scss';
import { Form, Toast } from 'react-bootstrap';
import colombiaJson from './colombia.json'

class App extends React.Component {
    state = {
        name: '',
        city: '',
        state: '',
        email: '',
        showToast: false
    };

    componentDidMount() {
        // this.getDataFromApi();
    }

    getDataFromApi = async () => {
        // No tiene cors el servidor, asi que lo uso local.
        // const response = await fetch('https://sigma-studios.s3-us-west-2.amazonaws.com/test/colombia.json', {
        //     mode: 'cors',
        //     headers: {
        //         'Access-Control-Allow-Origin':'*'
        //     }
        // });
        console.log(colombiaJson);
    };

    handleChangeState = (e) => {
        this.setState({
           city: '',
           state: e.target.value
        });
    };

    handleChangeCity = (e) => {
        this.setState({
            city: e.target.value,
        });
    };

    handleChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    };

    handleChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const headers = new Headers();
        await fetch('http://localhost/test-sigma/api/contacts.php', {
            method: 'POST',
            headers,
            mode: 'cors',
            body: JSON.stringify(this.state),
            cache: 'default'
        });
        this.setState({
            showToast: true,
            name: '',
            city: '',
            state: '',
            email: '',
        })

    };
    handleCloseToast = () => {
      this.setState({
          showToast: false
      })
    };

    render() {
        const {
            name, state, city, email, showToast
        } = this.state;
        const states = Object.keys(colombiaJson);
        let cities = [];
        if (state) {
            cities = colombiaJson[state];
        }
        return (
            <div className="App">
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    <Toast show={showToast} onClose={this.handleCloseToast}>
                        <Toast.Header>
                            <small>Atención</small>
                        </Toast.Header>
                        <Toast.Body>El Contacto se ha creado correctamente.</Toast.Body>
                    </Toast>
                </div>

                <header className="App-header">
                    <figure>
                        <img src={logo} alt="logo sigma" />
                    </figure>
                </header>
                <main>
                    <div className='title-container'>
                        <h1>
                            Prueba de desarrollo Sigma
                        </h1>
                        <div>
                        <span>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </span>
                        </div>
                    </div>
                    <div className='content-container'>
                        <div className='image-container'>
                            <figure>
                                <img src={imageApp} alt="image App"/>
                            </figure>
                        </div>
                        <div className='form-container'>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group>
                                    <Form.Label>Departamento*</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={state}
                                        onChange={this.handleChangeState}
                                        required>
                                        {
                                            states.map(state => (
                                                <option key={state} value={state}>{state}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Ciudad*</Form.Label>
                                    <Form.Control
                                        as="select"
                                        disabled={!state}
                                        value={city}
                                        onChange={this.handleChangeCity}
                                        required>
                                        {
                                            cities.map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Nombre*</Form.Label>
                                    <Form.Control
                                        type='text'
                                        value={name}
                                        maxLength={50}
                                        onChange={this.handleChangeName}
                                        required />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Correo*</Form.Label>
                                    <Form.Control
                                        type='email'
                                        value={email}
                                        maxLength={30}
                                        onChange={this.handleChangeEmail}
                                        required />
                                </Form.Group>
                                <div className='button-container'>
                                    <button type="submit" className="btn btn-primary">
                                        ENVIAR
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default App;
