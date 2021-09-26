import React from 'react';
import Appbar from "../components/Appbar.js";
import schoolData from "../data/ma_schools.json";
import { Link } from "react-router-dom";

class Home extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
        data: schoolData,
        db: schoolData,
        perPage: 5,
        currentPage: 1,
        pageCount: 1,
        searchText: "",
      };
  }

  componentDidMount() {
    this.indexSchools();
    this.loadSchools();
  }

  indexSchools(){
    // Each school needs a unique id
    let newSchoolData = []
    for (let i = 0; i < schoolData.length; i++) {
     let school = schoolData[i];
     school["ID"] = i;
     newSchoolData.push(school);
    }
    this.setState({data: newSchoolData, db: newSchoolData})
  }

  loadSchools(){
    let pageCount = Math.ceil(this.state.db.length / this.state.perPage)
    this.setState({pageCount: pageCount})
    this.generatePagination(this.state.currentPage, this.state.db);
  }

  generatePagination(currentPage, db){
    // Get current lower bounds and upper bounds
    let upperIndex = ((this.state.perPage * currentPage) - 1)
    let lowerIndex = ((upperIndex + 1) - this.state.perPage)
    
    // Get items in range
    let newArr = db.slice(lowerIndex, upperIndex)

    // Update scope data 
    this.setState({data: newArr})
  }

  navigatePagination(page) {
      // Handle Edge Cases
      let operands = ["<", ">", "..."]
      if(operands.includes(page)){
        let localPage = page;
        if(page === "<" && this.state.currentPage >= 2){
          localPage = this.state.currentPage - 1
          this.setState({currentPage: localPage})
          this.generatePagination(localPage, this.state.db);
        }else if((page === ">" || page === "...") && this.state.currentPage <= (this.state.pageCount -1)){
          localPage = this.state.currentPage + 1
          this.setState({currentPage: localPage})
          this.generatePagination(localPage, this.state.db);
        }

      }else{
        // Base Case
        this.setState({currentPage: page})
        this.generatePagination(page, this.state.db);
      }
  }

  fuzzySearch = e => {
    // Full text search
    let filteredSearch = e.target.value;
    // Utilize Regex to filter text
    let buf = ".*" + filteredSearch.replace(/(.)/g, "$1.*").toLowerCase();
    let reg = new RegExp(buf);

    // Return filtered
    let sortedSearch = this.state.db.filter(function (school) {
      return reg.test(school.INSTNM.toLowerCase());
    });

    this.setState({ searchText: filteredSearch, data: sortedSearch });
    this.generatePagination(this.state.currentPage, sortedSearch)
  };

  render() {
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    
    const Pagination = () => {
        let paginationUpperBound = 1;
        let isLargePagination = false;
        if(this.state.pageCount > this.state.perPage){
          paginationUpperBound = this.state.perPage
          isLargePagination = true
        }else{
          paginationUpperBound = this.state.pageCount
          isLargePagination = false
        }

        let pageRange = range(1, paginationUpperBound, 1);

        if(isLargePagination){
          pageRange.push("...")
          pageRange.push(this.state.pageCount)
        }

        return pageRange.map((page, index)=>{
            return <button 
              className={this.state.currentPage == page ? "container--table-current container--table-flat" : " " + "container--table-flat"} 
              key={index} 
              onClick={() => this.navigatePagination(page)}>
                {page}
            </button>
        })
    }

    let keys = this.state.data.length > 0 ? Object.keys(this.state.data[0]) : [];

    let header = keys.map((key, index)=>{
        return <th key={key}>{key}</th>
    });

    const RenderRow = (props) =>{
      let rowKey = props.rowKey;
      return props.keys.map((key, index)=>{
          if(index === 6){
            return <td key={props.data[key]}><Link to={"/school/" + rowKey} ><button className="program--button"> {(props.data[key] && props.data[key].length !== 0) ? props.data[key].length : 0} Programs</button></Link></td>
          }else if(index === 12){
            return <td key={props.data[key]}><Link to={{ pathname: "https://" + props.data[key] }} target="_blank"><button className="program--button"> VISIT </button></Link></td>
          }else{
            return <td key={props.data[key]}>{props.data[key]}</td>
          }
      })
    }

    let tableData = this.state.data.map((row, index)=>{
      return <tr key={index}><RenderRow rowKey={row["ID"]} url={row[12]} key={index} data={row} keys={keys}/></tr>
    })


    return ( 
      <div className="container">
          <Appbar />

           <div className="container--table">
            <h1 className="container--table-h1">University and Schools in Massachusetts</h1>
            <h2 className="container--table-h2">Exploration by Paperless Parts</h2>

            <div className="container--flex">
              <input type="text" onChange={this.fuzzySearch} placeholder="&#9776;  Search for a university..." className="container--table-search" value={this.state.searchText} />
            </div>

            <table>
              <thead>
                <tr>{header}</tr>
              </thead>
              <tbody>
                {tableData}
              </tbody>
            </table>

            <div className="container--flex">
              <div className="container--table-pagination-position">{this.state.currentPage + " of " + this.state.pageCount }</div>
              <div className="container--table-pagination">
                <button className="container--table-chevron" onClick={() => this.navigatePagination("<")}>&#10094;</button>
                <Pagination page={this.state.pageCount} />
                <button className="container--table-chevron" onClick={() => this.navigatePagination(">")}>&#10095;</button>
              </div>
            </div>

          </div>
      </div>
    )
  }
}

export default Home;