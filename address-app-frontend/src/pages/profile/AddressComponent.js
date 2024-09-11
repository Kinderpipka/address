import React, { useState } from 'react';
import axios from 'axios';

const AddressSearch = ({ token }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/search', { query }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setResults(response.data.suggestions);
        } catch (error) {
            console.error('Error searching addresses', error);
        }
    };

    const handleSave = async (address) => {
        try {
            await axios.post('http://localhost:8000/api/addresses', { address }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Address saved');
        } catch (error) {
            console.error('Error saving address', error);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search addresses" />
            <button onClick={handleSearch}>Search</button>
            <ul>
                {results.map((result) => (
                    <li key={result.value}>
                        {result.value}
                        <button onClick={() => handleSave(result.value)}>Save</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddressSearch;
