import React, { useEffect, useState } from 'react';

const Table = () => {
    const [first, setfirst] = useState('');
    const [first1, setfirst1] = useState('');
    const [first2, setfirst2] = useState('');
    const [file, setfile] = useState(null);
    const [id, setid] = useState('');

    const [dd, setdd] = useState([]);

    useEffect(() => {
        stable();
    }, []);

    const send = async () => {
        const formdata = new FormData();
        formdata.append("first", first);
        formdata.append("first1", first1);
        formdata.append("first2", first2);
        formdata.append("file", file);

        const rr = await fetch("http://13.201.118.47:9000/table", {
            method: "post",
            body: formdata
        });

        const result = await rr.json();
        if (result.statuscode === 1) {
            alert("data sent");
            stable(); // Refresh data
        } else {
            alert("data not sent");
        }
    };

    const stable = async () => {
        const show = await fetch("http://13.201.118.47:9000/st", {
            method: "get",
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });

        const rr = await show.json();
        if (rr.statuscode === 1) {
            setdd(rr.data);
        }
    };

    const x = async (id) => {
        const a = await fetch(`http://13.201.118.47:9000/dddd/${id}`, {
            method: "delete"
        });

        if (a.ok) {
            alert("deleted");
            stable();
        } else {
            alert("not deleted");
        }
    };

    const gi = (f) => {
        setfirst(f.f);
        setfirst1(f.s);
        setfirst2(f.t);
        setid(f._id);
    };

    const ut = async () => {
        const d = { first, first1, first2, id };

        const ss = await fetch("http://13.201.118.47:9000/ut", {
            method: "put",
            body: JSON.stringify(d),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });

        if (ss.ok) {
            alert("updated");
            stable();
        } else {
            alert("not updated");
        }
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
            <div style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '20px', 
                borderRadius: '8px', 
                marginBottom: '30px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ marginTop: '0', color: '#333' }}>Student Form</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                    <input 
                        type='text' 
                        onChange={(e) => setfirst(e.target.value)} 
                        value={first} 
                        placeholder="Name"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <input 
                        type='text' 
                        onChange={(e) => setfirst1(e.target.value)} 
                        value={first1} 
                        placeholder="Class"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <input 
                        type='text' 
                        onChange={(e) => setfirst2(e.target.value)} 
                        value={first2} 
                        placeholder="Roll Number"
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                    <input 
                        type='file' 
                        onChange={(e) => setfile(e.target.files[0])} 
                        style={{ padding: '5px' }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={send}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Add Student
                    </button>
                    <button 
                        onClick={ut}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#2196F3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '16px'
                        }}
                    >
                        Update Student
                    </button>
                </div>
            </div>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '20px'
            }}>
                {dd.map((c) => (
                    <div key={c._id} style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        overflow: 'hidden',
                        transition: 'transform 0.2s',
                        ':hover': {
                            transform: 'translateY(-5px)'
                        }
                    }}>
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img 
                                src={`uploads/${c.p}`} 
                                alt={c.f} 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover' 
                                }} 
                            />
                        </div>
                        <div style={{ padding: '15px' }}>
                            <h3 style={{ margin: '0 0 10px', color: '#333' }}>{c.f}</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ color: '#666' }}>Class: {c.s}</span>
                                <span style={{ color: '#666' }}>Roll: {c.t}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    onClick={() => x(c._id)}
                                    style={{
                                        padding: '8px 15px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    Delete
                                </button>
                                <button 
                                    onClick={() => gi(c)}
                                    style={{
                                        padding: '8px 15px',
                                        backgroundColor: '#FFC107',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        flex: 1
                                    }}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;