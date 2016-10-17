import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import httpClient from 'axios'
import {
    Button,ButtonGroup,
    Form,FormGroup,ControlLabel,
    FormControl,HelpBlock,
    Checkbox,Radio,Grid,Row,Col,
    Table,Modal
} from 'react-bootstrap';


class App extends Component {
    constructor(){
        super()
       
        
    }
      state = {
            name: "",
            rating: "",
            rating1: "",
            rating2: "",
            suggest: "",
            movies: [],
            color: "",
            records:[],
            show: false,
            selectedName: "",
            selectedRating: "",
            selectedRating1: "",
            selectedRating2: "",
            selectedSuggest: "",
            selectedMovies: [],
            selectedColor: "",
            selectedId: ""
        }
          

    componentDidMount(){

        this.refreshData();
    }



     refreshData=()=>{

         httpClient.get('http://localhost:3004/surveys')
             .then((response)=> {
                 var data =response.data;
                 this.setState({
                     records:data
                 })

             }).catch((error)=> {

             });

     };

    onChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

 onChange1 = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
onChange2 = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };
 
  modalonChange = (fieldName)=> {
        return (event)=> {

            console.log(event.target.value);
            var state = this.state;
            state[fieldName] = event.target.value;
            this.setState(state);
        }
    };

    checkboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state;
            state[fieldName] = targetArray;
            this.setState(state);
        }
    };

 modalcheckboxChange = (fieldName)=> {
        return (event)=> {
            var targetArray = this.state[fieldName];
            if (targetArray.indexOf(event.target.value) >= 0)
                targetArray.splice(
                    targetArray.indexOf(event.target.value),
                    1
                );
            else
                targetArray.push(event.target.value);

            var state = this.state.selectedMovies;
            state[fieldName] = targetArray;
            this.setState(state.selectedMovies);
        }
    };

    saveSurvey = ()=> {

        var data = {name: this.state.name,
                    rating: this.state.rating,
                    rating1: this.state.rating1,
                    rating2: this.state.rating2,
                    suggest: this.state.suggest,
                    movies: this.state.movies,
                    color: this.state.color};
         console.log(data);
         delete data.records;

        httpClient.post('http://localhost:3004/surveys',
         data)
            .then((response)=> {
                this.refreshData();
            }).catch((error)=> {

            });
location.reload();
    };

    deleteItem = (id)=>{

        return ()=>{

            httpClient.delete('http://localhost:3004/surveys/'+ id )
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

        };
    };

    
 editItem = (id) =>{
        return ()=> {
            
            httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    console.log('edit');
                    var data = response.data
                    console.log(response.data);
                    this.setState({
                        name: data.name,
                        color: data.color
                    })
                }).catch((error)=>{
                    
                });
        };
    };

    openModal = (id)=>{

            return ()=>{
                this.setState({
                    show: true
                })

                 httpClient.get('http://localhost:3004/surveys/'+id)
                .then((response)=> {
                    var data = response.data
                    this.setState({
                         selectedName: data.name,
            selectedRating: data.rating,
            selectedRating1: data.rating1,
            selectedRating2: data.rating2,
            selectedSuggest: data.suggest,
            selectedMovies: data.movies,
            selectedColor: data.color,
            selectedId: data.id
                    })
                    console.log(this.state.selectedData.name);
                }).catch((error)=>{
                    
                });

            };
        };

    

    saveEdit = (id) =>{


        return () => {
            console.log(data);
            var data = {name: this.state.selectedName,
                    rating: this.state.selectedRating,
                    rating1: this.state.selectedRating1,
                    rating2: this.state.selectedRating2,
                    suggest: this.state.selectedSuggest,
                    movies: this.state.selectedMovies,
                    color: this.state.selectedColor};
            delete data.records;

            httpClient.patch('http://localhost:3004/surveys/'+id,
            data)
                .then((response)=> {
                    this.refreshData();
                }).catch((error)=> {

                });

            this.setState({
                show: false,
            selectedName: "",
            selectedRating: "",
            selectedRating1: "",
            selectedRating2: "",
            selectedSuggest: "",
            selectedMovies: [],
            selectedColor: "",
            });
        }
    };

    render() {

        var rows  = this.state.records.map((item,i)=>{

            return (
                <tr key={i}>
                     <td className="text-center"><Button bsSize="xsmall"  bsStyle="warning" onClick={this.openModal(item.id)}>Edit</Button>
                    &nbsp; 
                     <Button bsSize="xsmall" bsStyle="danger" onClick={this.deleteItem(item.id)}>Delete</Button>
                     
                        
                     </td>
                     <td className="text-center">{item.id}</td>
                     <td>{item.rating}<br/>{item.rating1}<br/>{item.rating2}</td>
                     <td className="textfieldarea">{item.suggest}</td>
                      <td>{
                         item.movies.map((movie, mi)=> {
                             return <div key={mi}>
                                   <span>{movie}</span>
                                 </div>
                         })

                      }
                     </td>
                     <td className="text-center">{item.color}</td>
                    <td className="textfieldarea">{item.name}</td>
                </tr>
            );
        });
 let close = () => this.setState({ show: false })
                              
        const buttonStyle={
           marginRight: 'auto',
           marginLeft: 'auto',
          
        }

        return (
            <div className="container">
                <div className="page-header">
                    <h2 className="text-center">We're interested in your comments!</h2>
                </div>
                <div className="jumbotron">
                  
                  
                                <Form>
                                    
                                    <Table condensed striped bordered hover>
                                   <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-center">POOR</th>
                                        <th className="text-center">FAIR</th>
                                        <th className="text-center">GOOD</th>
                                        <th className="text-center">EXCELLENT</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Service</td>
                                        
                                        <td className="text-center"><Radio name="rating" value="Service: Poor"
                                               onChange={this.onChange('rating')}></Radio></td>
                                        <td className="text-center"><Radio name="rating" value="Service: FAIR"
                                               onChange={this.onChange('rating')}></Radio></td>
                                        <td className="text-center"><Radio name="rating" value="Service: GOOD"
                                               onChange={this.onChange('rating')}></Radio></td>
                                        <td className="text-center"><Radio name="rating" value="Service: Excellent"
                                               onChange={this.onChange('rating')}></Radio></td>
                                    </tr>
                                            <tr>
                                        <td>Food</td>
                                         
                                        <td className="text-center"><Radio name="rating1" value="Food: Poor"
                                               onChange={this.onChange1('rating1')}></Radio></td>
                                        <td className="text-center"><Radio name="rating1" value="Food: FAIR"
                                               onChange={this.onChange1('rating1')}></Radio></td>
                                        <td className="text-center"><Radio name="rating1" value="Food: GOOD"
                                               onChange={this.onChange1('rating1')}></Radio></td>
                                        <td className="text-center"><Radio name="rating1" value="Food: Excellent"
                                               onChange={this.onChange1('rating1')}></Radio></td>
                                    </tr>       
                                     <tr>
                                        <td>Atmosphere</td>
                                           
                                        <td className="text-center"><Radio name="rating2" value="Atmosphere: Poor"
                                               onChange={this.onChange2('rating2')}></Radio></td>
                                        <td className="text-center"><Radio name="rating2" value="Atmosphere: FAIR"
                                               onChange={this.onChange2('rating2')}></Radio></td>
                                        <td className="text-center"><Radio name="rating2" value="Atmosphere: GOOD"
                                               onChange={this.onChange2('rating2')}></Radio></td>
                                        <td className="text-center"><Radio name="rating2" value="Atmosphere: Excellent"
                                               onChange={this.onChange2('rating2')}></Radio></td>
                                    
                                   
                                    </tr> 
                                       </tbody>
                                </Table>

                                <br/>


                                        
                                        
                                    <FormGroup>
                                            <ControlLabel>Please share your experience :</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder=""
                                            value={this.state.suggest}
                                            onChange={this.onChange('suggest')}
                                            cols="60"
                                            rows = "4"
                                                />
                                    </FormGroup>
                                        
                                   <ControlLabel>How did you hear about us?</ControlLabel>
                                   
                                    <Table condensed striped bordered hover>
                                    <tbody>
                                   <tr>
                                   
                                   <td>
                                  <Checkbox value="Eaten here before"
                                                  checked={this.state.movies.indexOf('Eaten here before')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>I've eaten here before
                                        </Checkbox></td>
                                   <td>  <Checkbox value="Advertised"
                                                  checked={this.state.movies.indexOf('Advertised')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>Advertisement
                                        </Checkbox></td>
                               
                                    
                                
                                    </tr>
                                    <tr>
                                      <td>   <Checkbox value="Refferred by a friend"
                                                  checked={this.state.movies.indexOf('Refferred by a friend')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>Refferred by a friend
                                        </Checkbox></td>
                                      <td>   <Checkbox value="Internet/Website"
                                                  checked={this.state.movies.indexOf('Internet/Website')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>Internet/Website
                                        </Checkbox></td>
                                    </tr>
                                    <tr>
                                      <td>   <Checkbox value="Just drove/walked by"
                                                  checked={this.state.movies.indexOf('Just drove/walked by')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>Just drive/walking by
                                        </Checkbox></td>
                                          <td>   <Checkbox value="Others"
                                                  checked={this.state.movies.indexOf('Others')>=0 ? true:false}
                                                  onChange={this.checkboxChange('movies')}>Others
                                        </Checkbox></td>
                                    </tr>
                                    </tbody>
                                    </Table>
                                    
                                   

                                     <FormGroup>
                                        <ControlLabel>Would you like to subscribe and be notified of special offers and events?</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder=""
                                                     value={this.state.color}
                                                     onChange={this.onChange('color')}
                                            >
                                            <option selected disabled>SUBSCIRBE:</option>
                                            <option value="Yes">YES</option>
                                            <option value="No">NO</option>
                                            
                                        </FormControl>
                                        
                                    </FormGroup>

                                     <FormGroup>
                                        <ControlLabel>Your e-mail address:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="(optional)"
                                            value={this.state.name}
                                            onChange={this.onChange('name')}
                                            />
                                      
                                    </FormGroup>

                                    <br/>
                                    <ButtonGroup vertical block>
                                    <Button bsStyle="primary" bsSize="large" block onClick={this.saveSurvey}>Send</Button>
    
                                    </ButtonGroup>

                                          
                                   
                                       <h3 className="text-center"> THANK YOU!</h3>
                                       
                                </Form>
       
                     </div>
                        
                                   <div className="container1">
                                    <div className="jumbotron">
                              <h3 className="text-center"> PORTFOLIO</h3> 
                                <Table condensed striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th className="text-center">Action</th>
                                        <th className="text-center">ID</th>
                                        <th className="text-center">Evaluation</th>
                                        <th className="text-center">Feedback</th>
                                        <th className="text-center">Discovery</th>
                                        <th className="text-center">Subscribe</th>
                                        <th className="text-center">E-mail</th>
                                        
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {rows}
                                    </tbody>
                                </Table>
                                
                    </div>
                      <div className="modal-container" style={{height: 20}}>
                    <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Edit Portfolio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form>
                       
                                    <Table condensed striped bordered hover>
                                   <thead>
                                    <tr>
                                        <th></th>
                                        <th className="text-center">POOR</th>
                                        <th className="text-center">FAIR</th>
                                        <th className="text-center">GOOD</th>
                                        <th className="text-center">EXCELLENT</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Service</td>
                                        
                                        <td className="text-center"><Radio name="selectedRating" value="Service: Poor"
                                               onChange={this.modalonChange('selectedRating')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating" value="Service: FAIR"
                                               onChange={this.modalonChange('selectedRating')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating" value="Service: GOOD"
                                               onChange={this.modalonChange('selectedRating')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating" value="Service: Excellent"
                                               onChange={this.modalonChange('selectedRating')}></Radio></td>
                                    </tr>
                                            <tr>
                                        <td>Food</td>
                                         
                                        <td className="text-center"><Radio name="selectedRating1" value="Food: Poor"
                                               onChange={this.modalonChange('selectedRating1')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating1" value="Food: FAIR"
                                               onChange={this.modalonChange('selectedRating1')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating1" value="Food: GOOD"
                                               onChange={this.modalonChange('selectedRating1')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating1" value="Food: Excellent"
                                               onChange={this.modalonChange('selectedRating1')}></Radio></td>
                                    </tr>       
                                     <tr>
                                        <td>Atmosphere</td>
                                         
                                        <td className="text-center"><Radio name="selectedRating2" value="Atmosphere: Poor"
                                               onChange={this.modalonChange('selectedRating2')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating2" value="Atmosphere: FAIR"
                                               onChange={this.modalonChange('selectedRating2')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating2" value="Atmosphere: GOOD"
                                               onChange={this.modalonChange('selectedRating2')}></Radio></td>
                                        <td className="text-center"><Radio name="selectedRating2" value="Atmosphere: Excellent"
                                               onChange={this.modalonChange('selectedRating2')}></Radio></td>
                                   
                                    </tr> 
                                       </tbody>
                                </Table>

                                <br/>


                                        
                                        
                                    <FormGroup>
                                            <ControlLabel>Please share your experience :</ControlLabel><br/>
                                        <textarea
                                            type="textarea"
                                            placeholder=""
                                            value={this.state.selectedSuggest}
                                            onChange={this.modalonChange('selectedSuggest')}
                                            cols="60"
                                            rows = "4"
                                                />
                                    </FormGroup>
                                        
                                   <ControlLabel>How did you hear about us?</ControlLabel>
                                   
                                    <Table condensed striped bordered hover>
                                    <tbody>
                                   <tr>
                                   
                                   <td>
                                  <Checkbox value="Eaten here before"
                                                  checked={this.state.selectedMovies.indexOf('Eaten here before')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>I've eaten here before
                                        </Checkbox></td>
                                   <td>  <Checkbox value="Advertised"
                                                  checked={this.state.selectedMovies.indexOf('Advertised')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>Advertisement
                                        </Checkbox></td>
                               
                                    
                                
                                    </tr>
                                    <tr>
                                      <td>   <Checkbox value="Refferred by a friend"
                                                  checked={this.state.selectedMovies.indexOf('Refferred by a friend')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>Refferred by a friend
                                        </Checkbox></td>
                                      <td>   <Checkbox value="Internet/Website"
                                                  checked={this.state.selectedMovies.indexOf('Internet/Website')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>Internet/Website
                                        </Checkbox></td>
                                    </tr>
                                    <tr>
                                      <td>   <Checkbox value="Just drove/walked by"
                                                  checked={this.state.selectedMovies.indexOf('Just drove/walked by')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>Just drive/walking by
                                        </Checkbox></td>
                                          <td>   <Checkbox value="Others"
                                                  checked={this.state.selectedMovies.indexOf('Others')>=0 ? true:false}
                                                  onChange={this.modalcheckboxChange('selectedMovies')}>Others
                                        </Checkbox></td>
                                    </tr>
                                    </tbody>
                                    </Table>
                                    
                                   

                                     <FormGroup>
                                        <ControlLabel>Would you like to subscribe and be notified of special offers and events?</ControlLabel>
                                        <FormControl componentClass="select"
                                                     placeholder=""
                                                     value={this.state.selectedColor}
                                                     onChange={this.modalonChange('selectedColor')}
                                            >
                                            <option selected disabled>SUBSCIRBE:</option>
                                            <option value="Yes">YES</option>
                                            <option value="No">NO</option>
                                            
                                        </FormControl>
                                        
                                    </FormGroup>

                                     <FormGroup>
                                        <ControlLabel>Your e-mail address:</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="(optional)"
                                            value={this.state.selectedName}
                                            onChange={this.modalonChange('selectedName')}
                                            />
                                      
                                    </FormGroup>

                                    <br/>
                                    <ButtonGroup vertical block>
                                    <Button bsStyle="primary" bsSize="large" block onClick={this.saveEdit(this.state.selectedId)}>Send</Button>
    
                                    </ButtonGroup>

               
                                            </Form>
                            </Modal.Body>
                        </Modal>
                        </div>
                        </div>
                         <div className="footer">&copy;El Galleto's Resto.<br/>All rights reserved 2016.</div>
            </div>
          

        );
        
    }
}


export default App;
