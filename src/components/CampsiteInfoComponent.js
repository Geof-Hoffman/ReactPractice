
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button,
     Input, Label, FormGroup, Modal, ModalHeader, ModalBody, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);
const isNumber = val => !isNaN(+val);
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);



    class CommentForm extends Component { 

        constructor(props) {
            super(props);
    
            this.state = {
                isModalOpen: false
            };
               
            this.toggleModal = this.toggleModal.bind(this);
            this.handleComment = this.handleComment.bind(this);
        }
    

        
    

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleComment(values) {
        console.log("Current state is: " + JSON.stringify(values));
        alert("Current state is: " + JSON.stringify(values));
        
        this.toggleModal();
    }       

        render (){
            return(
            <div>   
                <span className=" ml-auto">
                    <Button outline onClick={this.toggleModal}>
                        <i className="fa fa-pencil fa-lg" /> Submit Comment
                    </Button>
                </span>
                <div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <div className="form-group">
                <LocalForm onSubmit={values => this.handleComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                    
                                        <Control.select model=".rating" id="rating" className="form-control" >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>          
                                        
                                    
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Name</Label>
                                    
                                    <Control.text model=".author" id="author" name="author"
                                         className="form-control"
                                         validators={{
                                             required,
                                             minLength: minLength(2),
                                             maxLength: maxLength(15) 
                                         }}                                       
                                       />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            component="div"
                                            messages={{
                                                required: 'Required',
                                                minLength: 'Must be at least 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                
                                <Control.textarea model=".text" id="text" name="text"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(2),
                                            maxLength: maxLength(140) 
                                        }}                                     
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".text"
                                        show="touched"
                                        component="div"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 140 characters or less',
                                        }}
                                    />
                                
                            </Row>                          
                            <Row className="form-group">
                                
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                
                            </Row>
                        </LocalForm>
                        </div>
                         
                </ModalBody>
            </Modal>
        </div>
            </div>
            );

        }
    }
     

    function RenderCampsite({campsite}) {
            return (
                <div className="col col-md-5 m-1">
                    <Card>
                     <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }

    function RenderComments({comments, addComment, campsiteId}) {
        if (comments) {
            return (
                <div className="col col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment =>{ 
                        return(
                            <div key={comment.id}>
                                <p>{comment.text} <br /> 
                                {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 
                                '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                            </div>                                
                                                        
                        );
                    })}

                    <React.Fragment>
                    <CommentForm campsiteId={campsiteId} addComment={addComment} />
                    </React.Fragment>  
                </div>
            );
        }
        return <div />
    }
    function CampsiteInfo(props) {
        if (props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        if (props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
         if (props.campsite) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderCampsite campsite= {props.campsite} />
                        <RenderComments 
                        comments={props.comments}
                        addComment={props.addComment}
                        campsiteId={props.campsite.id}
                    />
                    </div>
                </div>
            );
        }
        return(<div />);
    }

export default CampsiteInfo; 
