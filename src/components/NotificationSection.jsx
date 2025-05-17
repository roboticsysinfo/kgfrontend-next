"use client"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markNotificationAsRead } from '@/redux/slices/notificationsSlice';
import moment from "moment";


const NotificationSection = () => {
    
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications.items);
    const [refreshing, setRefreshing] = useState(false);
    const [visibleCount, setVisibleCount] = useState(20);

    const loadNotifications = async () => {
        setRefreshing(true);
        await dispatch(fetchNotifications());
        setRefreshing(false);
    };

    useEffect(() => {
        loadNotifications();
    }, []);

    const handleNotificationClick = (item) => {
        if (!item.read) {
            dispatch(markNotificationAsRead(item._id));
        }

        if (item.type === "order" || item.type === "review" || item.type === "familyRequest") {
            window.location.href = "/account";
        }
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    return (
        <div className="notifications-container">
            {notifications.length === 0 ? (
                <div className="empty-container">
                    <h3>No Notifications</h3>
                    <p>We’ll let you know when there is something to update you.</p>
                </div>
            ) : (
                <div className="notification-list">
                    {notifications.slice(0, visibleCount).map((item) => (
                        <div
                            key={item._id || Math.random().toString()}
                            className={`notification-item ${item.read ? "read" : "unread"}`}
                            onClick={() => handleNotificationClick(item)}
                        >
                            <img
                                src={item.profileImage || "https://avatar.iran.liara.run/public/boy"}
                                alt="Avatar"
                                className="notification-avatar"
                            />
                            <div className="notification-content">
                                <h4>From: {item.userName}</h4>
                                <p>{item.message}</p>
                            </div>
                            <span className="notification-time">{moment(item.createdAt).fromNow()}</span>
                        </div>
                    ))}

                    {visibleCount < notifications.length && (
                        <div className="load-more-container">
                            <button className="load-more-button" onClick={handleLoadMore}>Load More</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotificationSection;
