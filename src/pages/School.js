import React from 'react';
import Appbar from "../components/Appbar.js";
import schoolData from "../data/ma_schools.json";
import programData from "../data/programs.json"; 
import { Link } from "react-router-dom";


class School extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        school: null,
        programs: []
      };
  }

  componentDidMount() {
      this.getCurrentSchool();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getCurrentSchool();
    }  
  }

  getCurrentSchool(){
      let schoolIndex = this.props.match.params.id;
      let school = schoolData[schoolIndex];
      let schoolPrograms = school.PROGRAMS;
      // Generate Programs
      let actualProgams = []
      for (let i = 0; i < schoolPrograms.length; i++) {
        actualProgams.push(programData[schoolPrograms[i]]);
      }
      // Base state for schools and programs
      this.setState({school: school, programs: actualProgams});
  }

  render() {
    
    let keys = this.state.school ? Object.keys(this.state.school) : [];
    let programs = this.state.programs ? this.state.programs : [];
    let progamsLength = this.state.programs ? this.state.programs.length : 0;

    let about = keys.map((key, index)=>{
        if(index != 6){
            return <div className="about--row--item" key={key}>{key}</div>
        }
    });

    let aboutValues = keys.map((key, index)=>{
        if(index != 6){
            return <div className="about--row--item" key={key}>{this.state.school[key]}</div>
        }
    });

    let actualProgams = programs.map((program, index)=>{
        return <div className="about--row-majors" key={program}>&#9900; &nbsp; {program}</div>
    });

    return ( 
      <div className="container">
          <Appbar />
           <div className="container--table">
            <h1 className="container--table-h1">{this.state.school ? this.state.school.INSTNM : ""}</h1>

            <div className="container--flex">
                <button className="program--button-school">{this.state.school ? this.state.school.CITY + ", " + this.state.school.STABBR  : "" }</button>

                <button onClick={() => (
                  
                  window.open("https://" + (this.state.school ? this.state.school.INSTURL : "")))}
                   className="program--button-school">{this.state.school ? this.state.school.INSTURL : "" }</button>
            </div>

            <hr></hr>

            <div className="container--flex">
                <div className="container--flex-about">
                    <h3 className="container--table-h3">&#9777; About </h3>
                    <div className="container--flex">
                        <div className="about--content about--content-keys">{about}</div>
                        <div className="about--content about--content-values">{aboutValues}</div>
                    </div>
                </div>
                <div className="container--flex-programs">
                    <h3 className="container--table-h3"> {"(" + progamsLength + ")"} Programs </h3>
                    {actualProgams}
                </div>
            </div>
           </div>
      </div>
    )
  }
}

export default School;