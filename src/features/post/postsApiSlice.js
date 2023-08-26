import {apiSlice} from '../api/apiSlice'
export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
       
        getAllPostsByUsername: builder.query({
            query: username => `/posts/${username}`
        }),
        getUserPostsByUsername: builder.query({
            query: username => `/posts/myposts/${username}`,
            providesTags:() => {
                return [{type:'Post', id:'USER'}]
            }
        }),
        addPost: builder.mutation({
            query: body =>({
                url:"/posts",
                method:"POST",
                body
            }),
            invalidatesTags:()=>{
                return [{type:'Post', id:'USER'}]
            }
        }),
        updatePost: builder.mutation({
            query: body => ({
                url: `/posts/${body._id}`,
                method: "PATCH",
                body
            })
        }),
        deletePost: builder.mutation({
            query: id => ({
                url:`/posts/${id}`,
                method:'DELETE'     
            }),
            invalidatesTags:()=>{
                return [{type:'Post', id:'USER'}]
            }
        }),
        likePost: builder.mutation({
            query: body => ({
                url: `/posts/like/${body.id}`,
                method:'PATCH',
                body:{
                    username:body.username
                }
            })
        }),
        getComments: builder.query({
            query: id => `/posts/comments/${id}`
        }),
        addComment: builder.mutation({
            query: body => ({
                url:`/posts/comments/${body.id}`,
                method:'POST',
                body: body.comment
            })
        })
    })
});

export const {
    useGetAllPostsByUsernameQuery,
     useGetPostByIdQuery,
     useGetUserPostsByUsernameQuery,
      useAddPostMutation,
       useDeletePostMutation,
       useLikePostMutation,
       useGetCommentsQuery,
       useAddCommentMutation
    } = postsApiSlice;