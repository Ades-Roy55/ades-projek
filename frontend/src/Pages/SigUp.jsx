import { NavLink } from "react-router-dom";

const SignUp = () =>{
    return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="text-center text-3xl font-extrabold text-red-900">Sign Up</h1>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <input
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-red-300 placeholder-red-500 text-red-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Your Password"
                  />
                </div>
              </div>
    
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-red-700">
                    Already have an account?
                    <NavLink to="/login" className="font-medium text-red-600 hover:text-red-500 ml-1">Sign In</NavLink>
                  </p>
                </div>
              </div>
    
              <div>
                <NavLink to="/login"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign Up
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      );
}

export default SignUp;
