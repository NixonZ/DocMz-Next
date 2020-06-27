import { Form, Icon, Input, Radio } from "antd";
import Link from "next/link";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import ErrorAlert from "../components/error/ErrorAlert";
import withBasicLayout from "../components/layouts/basic-layout/withBasicLayout";
import Loader from "../components/loader/Loader";
import onlyGuest from "../components/onlyGuest/onlyGuest";
import { setLoggedInDoctor, setLoggedInPatient } from "../redux/actions";
import { doctorLogin, patientLoginbyImage } from "../services/api";
import rules from "../services/validations/rules";

const { Item: FormItem } = Form;

class loginbyimage extends Component {
    constructor() {
        super();
        this.localVideoRef = React.createRef();
        this.state = {
            isLoading: false,
            userType: "Patient"
        };
    }
    componentDidMount() {
        let video = document.getElementById('SourceVideo');

        let canvas = document.getElementById('OutputVideo');

        let ctx = canvas.getContext('2d');

        canvas.style.display = "none";

        navigator.mediaDevices.getUserMedia({
            video: {
                width: { min: 640 },
                height: { min: 480 }
            },
            audio: false
        }).then((stream) => {
            this.localVideoRef.current.srcObject = stream;
        }).catch((e) => {
            console.log(e);
        })

        video.addEventListener('canplay', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setInterval(function () {
                ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            }, 50);
        });

        if (this.props.loggedInDoctor._id) {
            Router.push("/doctor/newdash");
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.loggedInDoctor !== this.props.loggedInDoctor) {
            if (this.props.loggedInDoctor._id) {
                Router.push("/doctor/newdash");
            }
        }

    }
    handleSubmit = e => {
        e.preventDefault();
        const {
            form: { validateFields },
            onSubmit,
            setLoggedInDoctor,
            setLoggedInPatient
        } = this.props;
        validateFields((err, values) => {
            if (!err) {
                this.setState(
                    {
                        isLoading: true
                    },
                    () => {
                        const loginApi =
                            // this.state.userType === "Doctor" ? doctorLogin : patientLogin;
                            patientLoginbyImage;
                        loginApi({ ...values, image: document.getElementById('OutputVideo').toDataURL('image/jpeg') })
                            .then(({ data }) => {
                                if (data.status) {
                                    this.setState({
                                        isLoading: false
                                    });
                                    console.log({
                                        data
                                    });
                                    if (this.state.userType === "Doctor") {
                                        setLoggedInDoctor(data.user);
                                    } else {
                                        setLoggedInPatient(data.user);
                                    }
                                } else {
                                    this.setState({
                                        isLoading: false,
                                        errMsg: data.message || data.error
                                    });
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    isLoading: false,
                                    errMsg: "Something went wrong"
                                });
                                console.log(err);
                            });
                    }
                );
            }
        });
    };
    render() {
        const { isPersist } = this.props;
        const {
            getFieldDecorator,
            getFieldsError,
            getFieldError,
            getFieldValue
        } = this.props.form;
        const { sending, userface, isLoading, errMsg, userType } = this.state;
        if (!isPersist) {
            return <div />;
        }
        return (
            <div className="p-login maincontent-wrapper">
                <div className="container">
                    <div
                        className="row p-login__full-row"
                        style={
                            {
                                // minHeight: "80vh"
                            }
                        }
                    >
                        <div
                            className="col-xl-8 col-lg-6 p-login__left-col"
                        // style={{
                        //     backgroundImage: "url(/images/login/bg-image.png)",
                        //     backgroundSize: "contain",
                        //     backgroundPosition: "center",
                        //     backgroundRepeat: "no-repeat"
                        // }}
                        >
                            {/* <img src="" alt="" className="img-fluid"/> */}
                        </div>
                        <div className="col-xl-4 col-lg-6 d-flex justify-content-center pb-5">
                            <div className="p-login__form-wrapper p-lg-5 p-3">
                                <Form onSubmit={this.handleSubmit}>
                                    <div className="pb-3">
                                        <h5>Login as a {userType}</h5>
                                    </div>
                                    <div className="pb-3">
                                        <Radio.Group
                                            value={userType}
                                            onChange={e => {
                                                const { value } = e.target;
                                                this.setState({ userType: value });
                                            }}
                                        >
                                            <Radio value={"Doctor"}>Doctor</Radio>
                                            <Radio value={"Patient"}>Patient</Radio>
                                        </Radio.Group>
                                    </div>
                                    <div className="">
                                        <FormItem>
                                            {getFieldDecorator("email", {
                                                rules: [rules.required(), rules.email()]
                                            })(
                                                <Input
                                                    prefix={
                                                        <Icon
                                                            type="user"
                                                            style={{ color: "rgba(0,0,0,.25)" }}
                                                        />
                                                    }
                                                    placeholder="Email"
                                                />
                                            )}
                                        </FormItem>
                                    </div>
                                    <div className="">
                                        <video width="440" id="SourceVideo" ref={this.localVideoRef} autoPlay ></video>
                                        <canvas id="OutputVideo"></canvas>
                                    </div>
                                    <Loader isLoading={isLoading} />
                                    <ErrorAlert error={errMsg} />
                                    <div className="text-center d-block">
                                        <button
                                            disabled={isLoading}
                                            className="btn btn-primary btn-block"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        Don't have an account?{" "}
                                        <Link href="/register">
                                            <a>Register</a>
                                        </Link>
                                        <hr />
                                        <Link href="login">
                                            <a>Click here to login by Password.</a>
                                        </Link>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    loggedInDoctor: state.loggedInDoctor,
    loggedInPatient: state.loggedInPatient
});
const mapActionToProps = {
    setLoggedInDoctor,
    setLoggedInPatient
};
const loginForm = Form.create({
    name: "loginbyimage"
})(connect(mapStateToProps, mapActionToProps)(loginbyimage));

export default onlyGuest()(withBasicLayout(loginForm));
