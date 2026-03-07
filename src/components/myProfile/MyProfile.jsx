'use client';

import { updateUserProfile } from '@/actions/server/Users';
import Image from 'next/image';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const MyProfile = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        NID: user?.NID || '',
        Number: user?.Number || ''
    });

    const isGoogleUser = user?.provider === 'google';
    const canEditContactInfo = isGoogleUser && (!user?.NID || !user?.Number);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Check if any changes were made
        const hasChanges = formData.NID !== (user?.NID || '') || formData.Number !== (user?.Number || '');
        
        if (!hasChanges) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes',
                text: 'Please make changes before saving',
                confirmButtonColor: 'oklch(62% 0.14 230)'
            });
            return;
        }

        // Validate that at least one field has a value
        if (!formData.NID && !formData.Number) {
            Swal.fire({
                icon: 'warning',
                title: 'Required',
                text: 'Please fill in at least one field',
                confirmButtonColor: 'oklch(62% 0.14 230)'
            });
            return;
        }

        setLoading(true);

        try {
            const result = await updateUserProfile(user.email, formData);
            
            if (result.success) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: result.message,
                    confirmButtonColor: 'oklch(62% 0.14 230)'
                });
                setIsEditing(false);
                window.location.reload();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: result.message,
                    confirmButtonColor: 'oklch(62% 0.14 230)'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to update profile',
                confirmButtonColor: 'oklch(62% 0.14 230)'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-linear-to-r from-blue-500 to-blue-600 px-6 py-8">
                    <h1 className="text-3xl font-bold text-white">My Profile</h1>
                    <p className="text-blue-100 mt-2">Manage your personal information</p>
                </div>

                {/* Profile Content */}
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center">
                            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
                                <Image
                                    src={user?.Photo || '/assets/default-avatar.png'}
                                    alt={user?.name}
                                    width={160}
                                    height={160}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
                                    user?.role === 'admin' 
                                        ? 'bg-purple-100 text-purple-800' 
                                        : 'bg-green-100 text-green-800'
                                }`}>
                                    {user?.role?.toUpperCase()}
                                </span>
                            </div>
                        </div>

                        {/* Profile Information */}
                        <div className="flex-1">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                        <p className="text-gray-900">{user?.name}</p>
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                        <p className="text-gray-900">{user?.email}</p>
                                    </div>
                                </div>

                                {/* Role Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Account Role
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                        <p className="text-gray-900 capitalize">{user?.role}</p>
                                    </div>
                                </div>

                                {/* NID Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        National ID (NID)
                                    </label>
                                    {isEditing && canEditContactInfo ? (
                                        <input
                                            type="text"
                                            name="NID"
                                            value={formData.NID}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your National ID"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                            <p className="text-gray-900">{user?.NID || 'Not provided'}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Contact Number Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Contact Number
                                    </label>
                                    {isEditing && canEditContactInfo ? (
                                        <input
                                            type="text"
                                            name="Number"
                                            value={formData.Number}
                                            onChange={handleChange}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter your contact number"
                                        />
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                            <p className="text-gray-900">{user?.Number || 'Not provided'}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Provider Info */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Login Provider
                                    </label>
                                    <div className="bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                                        <p className="text-gray-900 capitalize">{user?.provider || 'credentials'}</p>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {canEditContactInfo && (
                                    <div className="flex gap-4 pt-4">
                                        {!isEditing ? (
                                            <button
                                                type="button"
                                                onClick={() => setIsEditing(true)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md"
                                            >
                                                Update Contact Info
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    type="submit"
                                                    disabled={loading}
                                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md disabled:opacity-50"
                                                >
                                                    {loading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsEditing(false);
                                                        setFormData({
                                                            NID: user?.NID || '',
                                                            Number: user?.Number || ''
                                                        });
                                                    }}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}

                                {/* Info Message for Google Users */}
                                {isGoogleUser && !canEditContactInfo && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-blue-800">
                                            <span className="font-semibold">Note:</span> Your contact information has been set and cannot be modified.
                                        </p>
                                    </div>
                                )}

                                {/* Info Message for Credentials Users */}
                                {!isGoogleUser && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Note:</span> Email and password cannot be updated from this page.
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;