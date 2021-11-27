import { addDoc, collection, getDocs, getFirestore, query, where } from "@firebase/firestore";
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const InsertPark = props => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);

    const onFinish = async (values) => {
        // console.log(values);
        setLoading(true);
        const q = query(
            collection(getFirestore(), "parks"),
            where('number', '==', values.number),
            where('status', '==', 'new'),
        )
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                message.error("Masih ada motor dengan plat: " + values.number);
                setLoading(false);
                return
            }

            await addDoc(collection(getFirestore(), "parks"), {
                createdAt: Date.now(),
                number: values.number,
                status: 'new',
                outAt: null,
            });
            form.resetFields();
            message.success("berhasil Input Data!");
            setLoading(false);
        } catch (e) {
            message.error(e.message);
            setLoading(false);
        }

    }
    return <div>
        {
            // auth.currentUser !== null ? <Redirect to="/detail" /> :
            <div>
                {/* <Button style={{ marginTop: '20px' }} onClicked={onClicked}>Logout</Button> <br /> */}
                <Row style={{ marginTop: '20px' }}>
                    <Col span={12} offset={6} style={{ backgroundColor: 'red' }}>
                        <Card title={<center>Insert Park</center>} bordered>
                            <Form form={form} name="formName" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" onFinish={onFinish}>
                                <Form.Item label="Nomor Polisi" name="number" rules={[{ required: true, message: 'Please Input Number' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                                    <Button type="default">
                                        <Link to="/out" >Parkir Keluar</Link> <br />
                                    </Button>
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }} loading={loading}>
                                        Simpan
                                    </Button>
                                    <br />

                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        }
    </div>
}

export default InsertPark;