
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { signIn, signUp } from '../features/users/actions'
import {Link} from "react-router-dom";

require("../../public/scss/authreg.scss")

class AuthRegComponent extends Component{
    componentDidMount() {
        this.refs.submit.value = this.props.match.params.type == "reg" ? "Sign Up" : "Sign In"
    }
    componentDidUpdate(){
        this.refs.submit.value = this.props.match.params.type == "reg" ? "Sign Up" : "Sign In"
    }
    login(e){
        e.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const repassword = this.refs.repassword ? this.refs.repassword.value : "";
        if(this.props.match.params.type == "reg"){
            if(password==repassword){
                this.props.signUp({email: email, password: password})
            }else{
                alert("Passwords shold be the same")
            }
        }
        if(this.props.match.params.type == "auth"){
            this.props.signIn({email: email, password: password})
        }
    }
    render(){
        const RepeatPassword = React.forwardRef((props, ref) => {
            if(this.props.match.params.type == "reg"){
                return(
                    <div className={"credential-div"}>
                        <p>Repeat your password</p>
                        <input ref={ref} type={"password"} placeholder={"Write your password again"} required/>
                    </div>
                )
            }
            return ("")
        })
        const ToogleBtn = () => {
            if(this.props.match.params.type != "reg"){
                return(
                    <Link to={"/login/reg"}>
                        Sign up
                    </Link>
                )
            }else{
                return(
                    <Link to={"/login/auth"}>
                        Sign in
                    </Link>
                )
            }
        }
        return(
            <div className={"auth-main-div"}>
                <div className={"auth-block-div"}>
                    <form onSubmit={this.login.bind(this)}>
                        <div className={"credential-div"}>
                            <p>Email</p>
                            <input ref={"email"} type={"email"} placeholder={"Write your email"} required/>
                        </div>
                        <div className={"credential-div"}>
                            <p>Password</p>
                            <input ref={"password"} type={"password"} placeholder={"Write your password"} required/>
                        </div>
                        <RepeatPassword ref={"repassword"}/>
                        <input ref={"submit"} className={"submit"} type={"submit"} value={"Sign in"}/>
                        <ToogleBtn/>
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user
});
const mapDispatchToProps = dispatch => ({
    signIn: (data) => dispatch(signIn(data)),
    signUp: (data) => dispatch(signUp(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AuthRegComponent);
