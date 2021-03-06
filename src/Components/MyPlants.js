import React, { Component } from 'react';
import AddedPlant from './AddedPlant';
import axios from 'axios';
import {ToastContainer,toast} from 'react-toastify';

//Props from App.js - retrieveMyPlantsList removeFromMyPlants myPlantsList, numESpring, numLSpring, numSummer,numFall
export default class MyPlants extends Component {
  constructor (props) {
    super(props);
    this.state = {
      notesInput:"",
      editToggle:{
        toggle:false,
        id:0
      }
    };
  }

  componentDidMount() {
    this.props.retrieveMyPlantsList()
  }

  toggleEdit = (id) => {
    if (this.state.editToggle.toggle===false) {
      let existingPlantInfo = this.props.myPlantsList.filter(plt=> plt.id.toString()===id ? true : false );
      existingPlantInfo = existingPlantInfo[0].project_notes;
      this.setState({
        notesInput: existingPlantInfo,
        editToggle:{
          toggle:true,
          id:id,
        }
      })
    } 
    if (this.state.editToggle.toggle===true) {
      let body = {"project_notes":this.state.notesInput};
      axios.patch(`/api/lists/${id}`, body)
      .then((res)=> this.props.setParentMyPlantsList(res.data))
      .catch(err=>toast.error(err));
      this.setState({
        notesInput:"",
        editToggle:{
          toggle:false,
          id:0
        }
      });
    };
  };

  handleChange = (value) => {
    this.setState({
      notesInput:value
    })
  }

  render() {

    const {removeFromMyPlants, myPlantsList, numESpring, numLSpring, numSummer,numFall} = this.props;
    const {notesInput,editToggle} = this.state;

    return (
      <aside>
        <h1 className="toPrint ">Project Notes</h1>
        <ToastContainer/>
        <section><h2 id='eSpringH'>Early Spring-<strong>{numESpring}</strong> in List</h2>
        <br/>
          <AddedPlant 
          myPlantsList={myPlantsList}
          removeFromMyPlants={removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Early Spring'}
          editToggle={editToggle}
          notesInput={notesInput}
          handleChange={this.handleChange}/>
        </section>
        <section><h2 id='lSpringH'>Late Spring-<strong>{numLSpring}</strong> in List</h2>
        <br/>
          <AddedPlant 
          myPlantsList={myPlantsList}
          removeFromMyPlants={removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Late Spring'}
          editToggle={editToggle}
          notesInput={notesInput}
          handleChange={this.handleChange}/>
        </section>
        <section><h2 id='summerH'>Summer-<strong>{numSummer}</strong> in List</h2>
        <br/>
          <AddedPlant 
          myPlantsList={myPlantsList}
          removeFromMyPlants={removeFromMyPlants}
          toggleEdit={this.toggleEdit}
          bloomTime={'Summer'}
          editToggle={editToggle}
          notesInput={notesInput}
          handleChange={this.handleChange}/>
        </section>
        <section><h2 id='fallH'>Fall-<strong>{numFall}</strong> in List</h2>
          <br/>
            <AddedPlant 
            myPlantsList={myPlantsList}
            removeFromMyPlants={removeFromMyPlants}
            toggleEdit={this.toggleEdit}
            bloomTime={'Fall'}
            editToggle={editToggle}
            notesInput={notesInput}
            handleChange={this.handleChange}/>
        </section>
        <div className='toPrint'>
          End of List
          <br/>
          <br/>
          <br/>
        </div>
      </aside>
    );
  };
} 