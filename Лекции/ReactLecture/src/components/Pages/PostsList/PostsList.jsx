import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import "./PostsList.css";
import Post from "./components/Post/Post";
import Modal from "./components/Modal/Modal";
import Paginator from "../../Paginator/Paginator";
import PostSelect from "./components/PostSelect/PostSelect";

const PAGE_SIZE = 10;
const sortingOptions = [
    {
        name: "По заголовку",
        value: "title",
    },
    {
        name: "По содержимому",
        value: "body",
    },
];

const PostsList = () => {
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState({
        searching: "",
        page: 1,
        sorting: "",
    });
    const [open, setOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    // function addPost(post) {
    //     const newPost = {
    //         ...post,
    //         id: new Date().getMilliseconds(),
    //         userId: 1,
    //     };

    //     setPosts([...posts, newPost]);
    // }

    const addPost = useCallback((post) => {
        const newPost = {
            ...post,
            id: new Date().getMilliseconds(),
            userId: 1,
        };

        setPosts([...posts, newPost]);
    }, []);

    function updateFilter(name, value) {
        setFilter({ ...filter, [name]: value });
    }

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.data)
            .then((data) => setPosts(data))
            .catch((err) => setPosts([]));
    }, []);

    const filteredSortedPosts = useMemo(() => {
        if (!posts.length) return [];

        const { searching, sorting } = filter;

        const result = posts.filter((post) =>
            post.title.toLowerCase().includes(searching.toLowerCase())
        );
        if (sorting) {
            result.sort((post1, post2) => post1[sorting].localeCompare(post2[sorting]));
        }

        return result;
    }, [posts, filter]);

    const pagesCount = Math.ceil(filteredSortedPosts.length / PAGE_SIZE);
    const pageIndex = PAGE_SIZE * (filter.page - 1);

    const close = useCallback(() => setOpen(false), []);

    return (
        <div className="container">
            <input
                className="post-input"
                value={filter.searching}
                onChange={(e) =>
                    setFilter({
                        searching: e.target.value,
                        page: 1,
                    })
                }
                placeholder="Поиск..."
            />

            <PostSelect
                options={sortingOptions}
                activeSorting={filter.sorting}
                updateSorting={(value) => updateFilter("sorting", value)}
            />

            {posts.length ? (
                <div className="post-list">
                    {filteredSortedPosts.slice(pageIndex, 10 + pageIndex).map((post) => (
                        <Post key={post.id} data={post} />
                    ))}
                </div>
            ) : (
                <h2>постов нет</h2>
            )}
            <button onClick={() => setOpen(true)}>Добавить</button>
            {pagesCount > 1 && (
                <Paginator
                    activePage={filter.page}
                    updatePage={(button) => updateFilter("page", button)}
                    pagesCount={Math.ceil(posts.length / PAGE_SIZE)}
                ></Paginator>
            )}
            <Modal open={open} addPost={addPost} close={close} />
        </div>
    );
};

export default PostsList;
