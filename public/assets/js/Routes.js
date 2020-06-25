class Routes {
  constructor () {
    
  }

  get root () {
    // return 'http://manifest-expensetracker.herokuapp.com/';
    return 'https://d56db9add77f4f85b2d170b091d7493f.vfs.cloud9.us-east-1.amazonaws.com';
    // return 'http://localhost:8080/'; // 
  };

  get apiRoot () { 
    return 'http://manifest-expensetracker.herokuapp.com/api/expense';
    // return 'https://d56db9add77f4f85b2d170b091d7493f.vfs.cloud9.us-east-1.amazonaws.com/api/expense';
    // return 'http://localhost:8080/api/expense'; // API Route
  };
}

const Route = new Routes;