import React, { useState } from "react";

function CommentBox() {
  const [comments, setComments] = useState([
    { id: 1, user: "Ali", text: "Hoodie quality bohot achi hai!" },
    { id: 2, user: "Sara", text: "Delivery fast thi, size perfect aya." },
    { id: 3, user: "Zaki", text: "Color thoda different tha, lekin overall acha product hai." },
    { id: 4, user: "Usman", text: "Fabric soft aur comfortable hai." },
  ]);

  const [newComment, setNewComment] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newEntry = {
      id: comments.length + 1,
      user: "You",
      text: newComment,
    };

    setComments([...comments, newEntry]);
    setNewComment("");
  };

  // Show only first 2 comments unless "Show More" clicked
  const visibleComments = showAll ? comments : comments.slice(0, 2);

  return (
    <>
      <div className="border-1 border-[1px solod gray grid grid-cols-1 md:grid-cols-12 ">
        <div className="max-w-3xl  p-4 border-1 shadow col-span-7 xl:col-span-7" id="review">
          <p className="text-xl font-bold mb-4 text-[25px] text-green-500 capitalize">Customer Riviews</p>

          {/* Comment Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="flex-1 border rounded px-3 py-2 text-white"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          {/* Comment List */}
          <div className="space-y-3 w-auto overflow-y-auto resize">
            {visibleComments.map((c) => (
              <div
                key={c.id}
                className="p-3 border rounded bg-gray-100 shadow-sm"
              >
                <p className="font-semibold">{c.user}</p>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          {comments.length > 2 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-3 text-blue-600 hover:underline"
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
        <div className="text-gray-500 p-3 md:p-5 flex flex-column justify-center items-center col-span-5 ">
          <p className="text-3xl">Message!</p>
          <p className="w-full">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
             Sit suscipit totam asperiores illo vero nihil perferendis
              nesciunt labore nam, quo quasi temporibus commodi vel
               nostrum architecto explicabo voluptate enim culpa?
               Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Sequi voluptatem deserunt quisquam dolorem ex hic,
                 reiciendis ad molestiae ratione sint maiores, cupiditate
                  distinctio? Debitis excepturi expedita voluptates cupiditate
                   illum quisquam.</p>
        </div>
      </div>
    </>
  );
}

export default CommentBox;