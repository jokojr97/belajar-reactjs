import { Row, Col, Card, Form, Input, Button, message } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = props => {
    const [loading, setLoading] = React.useState(false);
    const auth = getAuth();
    const history = useHistory();

    const onFinish = values => {
        // console.log(values);
        setLoading(true);
        const prom = signInWithEmailAndPassword(auth, values.username, values.password)
        prom.then((userCredential) => {
            const user = userCredential.user;
            message.success("Login Berhasil");
            setLoading(false);
            // console.log(user);
            history.push("/");
        }).catch((error) => {
            const ErorCode = error.code;
            const ErrorMessage = error.massage;
            message.error("Login Gagal");
            setLoading(false);
            console.log(ErrorMessage);
        });
    }

    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    const loginGoogle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            message.success("Login Berhasil");
            setLoading(false);
            // console.log(user);
            history.push("/");
        }).catch((error) => {
            const ErrorMessage = error.massage;
            message.error("Login Gagal");
            setLoading(false);
            console.log(ErrorMessage);

        });
    }


    return <div>
        {
            // auth.currentUser !== null ? <Redirect to="/detail" /> :
            <div>
                {/* <Button style={{ marginTop: '20px' }} onClicked={onClicked}>Logout</Button> <br /> */}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={12} offset={6} style={{ backgroundColor: 'red' }}>
                        <Card title="Login" bordered>
                            <Form name="formName" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" onFinish={onFinish}>
                                <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please Input Username' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please Input Password' }]}>
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                                    <Button type="primary" htmlType="submit" style={{ marginTop: "10px" }} loading={loading}>
                                        Login
                                    </Button>
                                    <br />

                                    <Button type="primary" style={{ marginTop: "10px" }} loading={loading} onClick={loginGoogle}>
                                        Login with google
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </div>
        }
    </div>
}

export default Login;