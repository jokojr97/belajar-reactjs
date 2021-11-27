import { addDoc, collection, getDocs, getFirestore, query, setDoc, where } from "@firebase/firestore";
import { Row, Col, Card, Form, Input, Button, message } from "antd";
import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const OutPark = props => {
    const [form] = Form.useForm();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState(null);

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
            console.log(querySnapshot)
            if (querySnapshot.empty) {
                message.error("Tidak ada motor dengan plat: " + values.number);
                setLoading(false);
                return
            }

            let d = querySnapshot.docs[0].data();
            const duration = parseInt((Date.now() - d.createdAt) / 1000);
            const minutes = parseInt(duration / 60);
            const diff = parseInt(minutes / 5);
            d.duration = minutes;
            d.price = 100 * diff;
            d.ref = querySnapshot.docs[0].ref;
            setData(d);
            form.resetFields();
            setLoading(false);
        } catch (e) {
            message.error(e.message);
            setLoading(false);
        }
    }

    const confirmOut = async () => {
        setLoading(true);
        try {
            await setDoc(data.ref, {
                status: 'out',
                outAt: Date.now(),

            }, { merge: true })

            form.resetFields();
            message.success("berhasil Checkout!");
            setLoading(false);
            setData(null);
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
                    <Col span={12} offset={6}>
                        <Card title={<center>Cari Kendaraan</center>} bordered>
                            <Form form={form} name="formName" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} autoComplete="off" onFinish={onFinish}>
                                <Form.Item label="Nomor Polisi" name="number" rules={[{ required: true, message: 'Please Input Number' }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 8, span: 18 }}>
                                    <Button type="default" style={{ marginLeft: "10px" }}>
                                        <Link to="/">Parkir Masuk</Link> <br />
                                    </Button>
                                    <Button type="primary" htmlType="submit" style={{ marginLeft: "10px" }} loading={loading}>
                                        Cari
                                    </Button>

                                    <br />

                                </Form.Item>
                            </Form>
                        </Card>
                        {
                            data != null &&
                            <Card title={<center>Parkir Keluar</center>} bordered>
                                Nopol : {data.number} <br />
                                Tanggal Masuk : {moment(data.createdAt).local().format('HH:mm DD-MMM-YYYY')} <br />
                                Tanggal Keluar : {moment(Date.now()).local().format('HH:mm DD-MMM-YYYY')} <br />
                                Durasi : {data.duration} Menit<br />
                                Harga : Rp. {data.price} <br /><br />
                                <Button type="primary" loading={loading} onClick={confirmOut}>
                                    Confirm Keluar
                                </Button>
                            </Card>
                        }
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </div>
        }
    </div >
}

export default OutPark;