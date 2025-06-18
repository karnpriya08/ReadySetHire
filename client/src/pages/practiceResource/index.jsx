// Importing dependencies and components
import React, { useEffect, useState } from 'react';
import QuestionCard from './component/QuestionCard';
import BlogCard from './component/BlogCard';
import API from '../../utils/axios';
import Loader from '../../component/Loader';

const QuestionPage = () => {

    const [category, setCategory] = useState('frontend');
    const [questions, setQuestions] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingQuestions, setLoadingQuestions] = useState(false);
    const [loadingBlogs, setLoadingBlogs] = useState(false);

    // Category dropdown options
    const categoryOptions = [
        { label: 'Frontend Development', value: 'frontend' },
        { label: 'Backend Development', value: 'backend' },
        { label: 'Full Stack Development', value: 'fullstack' },
        { label: 'Behavioural', value: 'behavioral' },
    ];

    // Update category and reset to first page
    const handleChange = (e) => {
        setCategory(e.target.value);
        setPage(1);
    };

    //  Fetch questions from backend based on category and page
    const loadQuestions = async () => {
        try {
            setLoadingQuestions(true);
            const res = await API.get('/questions', { params: { category, page, limit: 10 } });
            if (res?.data?.questions) {
                setQuestions(res.data.questions);
                setTotalPages(res.data.totalPages);
            }
        } catch (err) {
            console.error("Error fetching questions:", err);
            toast.error("Failed to load questions");
        } finally {
            setLoadingQuestions(false);
        }
    };

    //  Fetch blogs from backend based on selected category
    const loadBlogs = async () => {
        try {
            setLoadingBlogs(true);
            const res = await API.get('/blogs', { params: { category } });
            if (res?.data) {
                setBlogs(res.data);
            }
        } catch (err) {
            console.error("Error fetching blogs:", err);
            toast.error("Failed to load Blogs");
        } finally {
            setLoadingBlogs(false);
        }
    };

    // fetching data
    useEffect(() => {
        const fetchData = async () => {
            await loadQuestions();
            await loadBlogs();
        };
        fetchData();
    }, [category, page]);

    return (
        <main className="mt-20 mb-3 w-screen">
            {/* Category dropdown */}
            <div className="bg-gradient-to-bl from-gray-100 via-gray-300 to-cyan-200 w-full">
                <div className="w-full px-4 py-4 sm:px-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <label htmlFor="category" className="text-lg font-semibold text-cyan-800"> Select Category: </label>
                    <select id="category" value={category}
                        onChange={handleChange}
                        className="border rounded p-4 w-full sm:w-1/2 md:w-1/4 text-black">
                        {categoryOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/*  Questions Section */}
                <section className="w-full lg:w-2/3 m-3 p-1 rounded shadow">
                    {loadingQuestions ? (
                        <Loader />
                    ) : questions.length === 0 ? (
                        <div className="text-center py-10 px-4">
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-box-2130356-1800926.png"
                                alt="No Questions"
                                className="w-40 h-40 mx-auto opacity-80"
                            />
                            <h2 className="text-xl font-semibold text-gray-700 mt-4">Oops! No Questions Available</h2>
                            <p className="text-gray-500 mt-1">Try selecting a different category or refresh the page.</p>
                        </div>
                    ) : (
                        questions.map((question, index) => (
                            <QuestionCard question={question} key={question._id} index={index} />
                        ))
                    )}

                </section>

                {/*  Blogs Section */}
                <section className="w-full lg:w-1/3 m-3 p-1 rounded shadow-xl">
                    {loadingBlogs ? (
                        <Loader />
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-10 px-4">
                            <img
                                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-box-2130356-1800926.png"
                                alt="No Questions"
                                className="w-40 h-40 mx-auto opacity-80"
                            />
                            <h2 className="text-xl font-semibold text-gray-700 mt-4">Oops! No Blogs Available</h2>
                            <p className="text-gray-500 mt-1">Try selecting a different category or refresh the page.</p>
                        </div>
                    ) : (
                        blogs.map((blog, index) => (
                            <BlogCard blog={blog} key={index} />
                        ))
                    )}
                </section>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
                {/* previous button */}
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed">Previous</button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
                    <button key={pg} aria-label={`Go to page ${pg}`}
                        onClick={() => setPage(pg)}
                        className={`px-3 py-1 rounded-md border ${pg === page ? "bg-blue-700 text-white font-bold" : "bg-white text-black hover:bg-blue-100"}`} >
                        {pg} </button>
                ))}
                {/* next button */}
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-3 py-1 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    Next</button>
            </div>
        </main>
    );
};

export default QuestionPage;