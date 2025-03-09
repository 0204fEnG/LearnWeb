import React, { useState, useEffect } from 'react';
import { getCircleList} from '../../../api/circle';

const CircleList = ({searchParams}) => {
    const [circles, setCircles] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
        console.log(searchParams)
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchData = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await getCircleList(page, 10);
            const newCircles = response.data.data;
            setCircles([...circles, ...newCircles]);
            setHasMore(newCircles.length > 0);
            setPage(page + 1);
        } catch (error) {
            console.error('获取圈子列表失败:', error);
            setHasMore(false);
        }
        setLoading(false);
    };

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loading) {
            fetchData();
        }
    };

    return (
        <div>
            <h1>圈子列表</h1>
            <div className="circle-list">
                {circles.map((circle, index) => (
                    <div key={circle._id} className='circle-item'>
                        <img src={circle.avatar} alt={circle.name} />
                        <h2>{circle.name}</h2>
                        <p>{circle.description}</p>
                    </div>
                ))}
            </div>
            {loading && <div className="loader">Loading...</div>}
        </div>
    );
};

export default CircleList;