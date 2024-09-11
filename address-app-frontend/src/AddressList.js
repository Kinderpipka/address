import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddressList = ({ token }) => {
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/addresses', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setAddresses(response.data);
            } catch (error) {
                console.error('Error fetching addresses', error);
            }
        };

        fetchAddresses();
    }, [token]);

    return (
        <ul>
            {addresses.map((address) => (
                <li key={address.id}>{address.address}</li>
            ))}
        </ul>
    );
};

export default AddressList;
