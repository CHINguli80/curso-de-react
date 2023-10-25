import { Component } from 'react'
import './style.css';
import { PostCard } from '../../components/PostCard';
import { loadPosts } from '../../utils/load';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerpage: 12,
    searchValue: ''
  }

 async componentDidMount() {
    await this.loadPosts()   
  }

  loadPosts = async () => {
    const { page, postsPerpage } = this.state 
    const postsAndPhotos = await loadPosts()  
    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerpage),
      allPosts: postsAndPhotos
    })
  }

  loadMorePosts = () => {
    const {
      page, 
      postsPerpage,
      allPosts,
      posts
    } = this.state

    const nextPage = page + postsPerpage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })

  }

  handleChange = (e) => {
      const {value} = e.target
      this.setState({ searchValue: value})
  }

  render() {
    const { posts, page, postsPerpage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerpage >= allPosts.length

    const filterPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      )
    })
    : posts;

    return (
     <section className='container'>
     
        <div className='search-container'>
            {!!searchValue && (
            <h1>Pesquisou por: {searchValue}</h1>
          )}

          <TextInput 
          searchValue={searchValue} 
          handleChange={this.handleChange}
          />
        </div>
     
         <div className="posts">
       
         {filterPosts.length > 0 && (
        <>
         {
          filterPosts.map(post => (
            <PostCard 
            key={post.id}
              post={post}
            />
            ))
          }
          </>
      )}

          {filterPosts.length === 0 && (
            <p>Não existem Posts</p>
          )}

        <div className='button-container'>
          {!searchValue && (
            <Button 
            text="Lore more Post"
            onclick={this.loadMorePosts}
            disabled={noMorePosts}
         />
          )}
        
        </div>
      </div>
     </section>
    );
  }
  
}
