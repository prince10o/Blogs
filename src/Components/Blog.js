import { useState, useRef, useEffect } from "react";
import { db } from "../firebaseintit";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

export default function Blog() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [blogs, setBlogs] = useState([]);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No blogs!!";
    }
  }, [blogs]);

  useEffect(() => {
    async function fetchData() {
      const snapShot = await getDocs(collection(db, "blolgs"));
      console.log(snapShot);
      const blogs = snapShot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      console.log(blogs);
      setBlogs(blogs);
    }
    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setBlogs([{ title: formData.title, content: formData.content }, ...blogs]);
    await addDoc(collection(db, "blolgs"), {
      title: formData.title,
      content: formData.content,
      createdOn: new Date(),
    });
    // console.log("Document written with ID: ", docRef.id);

    setFormData({ title: "", content: "" });
    titleRef.current.focus();
    console.log(blogs);
  }

  function removeBlog(i) {
    setBlogs(blogs.filter((blog, index) => i !== index));
  }

  return (
    <>
      <h1>
        Write a Blog! <h2></h2>
      </h1>
      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              className="input"
              placeholder="Enter the Title of the Blog here.."
              value={formData.title}
              ref={titleRef}
              onChange={(e) =>
                setFormData({
                  title: e.target.value,
                  content: formData.content,
                })
              }
            />
          </Row>

          <Row label="Content">
            <textarea
              className="input content"
              placeholder="Content of the Blog goes here.."
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({
                  content: e.target.value,
                  title: formData.title,
                })
              }
            />
          </Row>

          <button className="btn">ADD</button>
        </form>
      </div>
      <hr />
      <h2> Blogs </h2>
      {blogs.map((blog, i) => (
        <div className="blog" key={i}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>

          <div className="blog-btn">
            <button onClick={() => removeBlog(i)} className="blog-remove">
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

function Row(props) {
  const { label } = props;
  return (
    <>
      <label>
        {label}
        <br />
      </label>
      {props.children}
      <hr />
    </>
  );
}
