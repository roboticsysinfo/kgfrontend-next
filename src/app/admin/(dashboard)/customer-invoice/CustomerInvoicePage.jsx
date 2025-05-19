import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const CustomerInvoicePage = () => {

    const { orderId } = useParams();
    const [invoiceData, setInvoiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const invoiceRef = useRef();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await axiosInstance.get(`/customer/invoice/${orderId}`);
                setInvoiceData(res.data);
            } catch (error) {
                console.error('Error fetching customer invoice:', error);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) fetchInvoice();
    }, [orderId]);

    const handleDownloadPDF = async () => {
        const element = invoiceRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;

        const usableWidth = pdfWidth - margin * 2;
        const usableHeight = pdfHeight - margin * 2;

        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.height / imgProps.width;
        const imgHeight = usableWidth * imgRatio;

        pdf.addImage(imgData, 'PNG', margin, margin, usableWidth, imgHeight > usableHeight ? usableHeight : imgHeight);
        pdf.save(`customer_invoice_${orderId}.pdf`);
    };

    if (loading) return <p>Loading...</p>;
    if (!invoiceData) return <p>No invoice found.</p>;

    const { invoiceDetails } = invoiceData;
    const { orderId: id, customer, product, gstAmount, totalAmount } = invoiceDetails;

    console.log("invoice data", invoiceData)

    return (

        <>

            <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
                <button onClick={handleDownloadPDF} style={{ marginBottom: '1rem' }} className="btn btn-success">
                    Download Invoice PDF
                </button>

                <div ref={invoiceRef}>

                    <div className="d-flex justify-content-between align-items-start mb-4">

                        <div className='company-details'>
                            {/* Title & Note */}
                            <img src='/assets/images/kg-logo.jpg' alt="logo" width={100} height={100} />
                            <h6 className="fw-bold mb-0">Kissan Growth</h6>
                            <p className="text-muted">India’s #1 Farm Online Marketplace!</p>
                        </div>

                        <div>
                            <h6 className="mb-1">Robotic SysInfo</h6>
                            <p>GST: 06CDBPS7489B1ZB</p>
                            <p className="mb-0 " style={{ width: 400 }}>Shad Complex, Railway Rd, near S.D. Model School, New Janta Market, Sadar Bazar, Karnal, Haryana 132001<br />
                            </p>
                        </div>

                        <div className="text-end">
                            <p className="mb-0">Invoice# {invoiceDetails.orderId || '00000'}</p>
                            <p className="mb-0">Issue Date: {new Date(invoiceData.createdAt).toLocaleDateString() || 'mm/dd/yyyy'}</p>
                        </div>
                    </div>

                    <hr />


                    {/* Billing and Details */}
                    <div className="d-flex justify-content-between align-items-start my-30">



                        <div className="customer-details-container">
                            <h6 className="fw-bold">BILL TO</h6>
                            <p className="mb-0">{customer.name || 'Customer name'}</p>
                            <p className="mb-0">{customer.email || 'Email address'}</p>
                            <p className="mb-0">{customer.phoneNumber || 'Phone number'}</p>
                            <p className="mb-0">{customer.address || 'Street address'}</p>
                            <p className="mb-0">{customer.zip || 'Zip code, city, country'}</p>
                        </div>

                    </div>



                    <hr />

                    <h6 style={{ marginTop: '1.5rem' }}>Order Details</h6>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem', border: '1px solid #ccc' }}>
                        <thead>

                            <tr style={{ backgroundColor: '#f2f2f2' }}>
                                <th style={cellStyle}>Order ID</th>
                                <th style={cellStyle}>Product</th>
                                <th style={cellStyle}>Price</th>
                                <th style={cellStyle}>GST</th>
                                <th style={cellStyle}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={cellStyle}>{id}</td>
                                <td style={cellStyle}>{product.name}</td>
                                <td style={cellStyle}>₹{product.priceValue}</td>
                                <td style={cellStyle}>₹{gstAmount}</td>
                                <td style={cellStyle}>₹{totalAmount}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </>



    );
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
};

export default CustomerInvoicePage;
