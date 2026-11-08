import { useEffect, useState } from 'react';
import '../styling/Scrapbook.css';
import { supabase, supabaseConfigError } from '../supabaseClient';

import bags from '../assets/heart/destinyUSAMall/bags.png'
import books from '../assets/heart/destinyUSAMall/books.png'
import chiikawa from '../assets/heart/destinyUSAMall/chiikawa.png'
import ikea from '../assets/heart/destinyUSAMall/ikea.png'
import minecraftPlushies from '../assets/heart/destinyUSAMall/minecraftPlushies.png'
import mirror from '../assets/heart/destinyUSAMall/mirror.png'
import moreBooks from '../assets/heart/destinyUSAMall/moreBooks.png'
import pickles from '../assets/heart/destinyUSAMall/pickles.png'
import soap from '../assets/heart/destinyUSAMall/soap.png'

import nigiri from '../assets/heart/charcoalGrill/nigiri.png'
import threeBigBacks from '../assets/heart/charcoalGrill/threeBigBacks.png'
import yummy from '../assets/heart/charcoalGrill/yummy.png'

import bigbacks from '../assets/heart/sktrox/bigbacks.png'
import blossom1 from '../assets/heart/sktrox/blossom.png'
import blossom2 from '../assets/heart/sktrox/blossom2.png'
import blossom3 from '../assets/heart/sktrox/blossom3.png'
import cake from '../assets/heart/sktrox/cake.png'

import backyard from '../assets/heart/carvel/backyard.png'
import display from '../assets/heart/carvel/display.png'
import lunch from '../assets/heart/carvel/lunch.png'

import lakeside from '../assets/heart/onondagaLake/lakeside.png'
import pathway from '../assets/heart/onondagaLake/pathway.png'
import redChili from '../assets/heart/onondagaLake/redChili.png'
import shore from '../assets/heart/onondagaLake/shore.png'
import stupidBike from '../assets/heart/onondagaLake/stupidBike.png'
import sunset from '../assets/heart/onondagaLake/sunset.png'
import swings from '../assets/heart/onondagaLake/swings.png'
import trees from '../assets/heart/onondagaLake/trees.png'

import blossom from '../assets/heart/secondDate/blossom.png'
import cats from '../assets/heart/secondDate/cats.png'

import gift from '../assets/heart/firstDate/gift.png'
import poke from '../assets/heart/firstDate/poke.png'

const destinyUSAMallPhotos = [bags, books, chiikawa, ikea, minecraftPlushies, mirror, moreBooks, pickles, soap]
const charcoalGrillPhotos = [nigiri, threeBigBacks, yummy]
const sktroxPhotos = [bigbacks, blossom1, blossom2, blossom3, cake]
const carvelPhotos = [backyard, display, lunch]
const onondagaLakePhotos = [lakeside, pathway, redChili, shore, stupidBike, sunset, swings, trees]
const secondDatePhotos = [blossom, cats]
const firstDatePhotos = [gift, poke]

const todoCategories = [
    'Activities',
    'Restaurants/cafes/eateries',
    'Movies/Shows to watch',
];

const getErrorMessage = error => (
    error && typeof error.message === 'string' ? error.message : String(error)
);

const events = [
    {
        title: 'Destiny USA Trip',
        location: 'Syracuse, New York',
        date: 'November 7, 2026',
        bullets: [
            'Shopping & exploring'
        ],
        photos: destinyUSAMallPhotos
    },
    {
        title: 'Charcoal Grill & Modern Buffet',
        location: 'Syracuse, New York',
        date: 'November 7, 2026',
        bullets: [
            '3 bigbacks and an (un)limited amount of food'
        ],
        photos: charcoalGrillPhotos
    },
    {
        title: 'Bigbacking Over the Cuse',
        location: 'Syracuse, New York',
        date: 'November 6, 2026',
        bullets: [
            'Rewatching SKT vs ROX while bigbacking wings, pizza, cake, and soju'
        ],
        photos: sktroxPhotos
    },
    {
        title: 'Carvel Excursion',
        location: 'North Syracuse, New York',
        date: 'November 5, 2026',
        bullets: [
            'Skipping class and work to get ice cream'
        ],
        photos: carvelPhotos
    },
    {
        title: 'Onondaga Lake Trip',
        location: 'Liverpool, New York',
        date: 'November 1, 2026',
        bullets: [
            'Red Chili lunch -> Onondaga Lake exercise day'
        ],
        photos: onondagaLakePhotos
    },
    {
        title: 'Our Second Date',
        location: 'Syracuse, New York',
        date: 'October 27, 2026',
        bullets: [
            'Cats!'
        ],
        photos: secondDatePhotos
    },
    {
        title: 'Our First Date',
        location: 'Syracuse, New York',
        date: 'October 26, 2026',
        bullets: [
            'The beginning'
        ],
        photos: firstDatePhotos
    }
];

function Scrapbook() {
    const [activePhoto, setActivePhoto] = useState(null);
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [newTodoCategory, setNewTodoCategory] = useState(todoCategories[0]);
    const [isLoadingTodos, setIsLoadingTodos] = useState(true);
    const [isMutatingTodos, setIsMutatingTodos] = useState(false);
    const [todoError, setTodoError] = useState(null);

    useEffect(() => {
        if (!activePhoto) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setActivePhoto(null);
        };

        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [activePhoto]);

    useEffect(() => {
        let isActive = true;

        const loadTodos = async () => {
            if (!supabase) {
                setTodoError(supabaseConfigError);
                setIsLoadingTodos(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('scrapbook_todos')
                    .select('id, title, category, completed')
                    .order('created_at', { ascending: false });

                if (!isActive) return;
                if (error) {
                    setTodoError(`Could not load date ideas: ${getErrorMessage(error)}`);
                } else {
                    setTodos(data);
                }
            } catch (error) {
                if (isActive) setTodoError(`Could not load date ideas: ${getErrorMessage(error)}`);
            } finally {
                if (isActive) setIsLoadingTodos(false);
            }
        };

        loadTodos();
        return () => {
            isActive = false;
        };
    }, []);

    const addTodo = async (event) => {
        event.preventDefault();
        const text = newTodo.trim();
        if (!text || !supabase || isMutatingTodos) return;

        setIsMutatingTodos(true);
        setTodoError(null);
        try {
            const { data, error } = await supabase
                .from('scrapbook_todos')
                .insert({ title: text, category: newTodoCategory })
                .select('id, title, category, completed')
                .single();

            if (error) {
                setTodoError(`Could not add date idea: ${getErrorMessage(error)}`);
                return;
            }

            setTodos(current => [data, ...current]);
            setNewTodo('');
        } catch (error) {
            setTodoError(`Could not add date idea: ${getErrorMessage(error)}`);
        } finally {
            setIsMutatingTodos(false);
        }
    };

    const toggleTodo = async (todo) => {
        if (!supabase || isMutatingTodos) return;

        setIsMutatingTodos(true);
        setTodoError(null);
        try {
            const { data, error } = await supabase
                .from('scrapbook_todos')
                .update({ completed: !todo.completed })
                .eq('id', todo.id)
                .select('id, title, category, completed')
                .single();

            if (error) {
                setTodoError(`Could not update date idea: ${getErrorMessage(error)}`);
                return;
            }

            setTodos(current => current.map(item => item.id === todo.id ? data : item));
        } catch (error) {
            setTodoError(`Could not update date idea: ${getErrorMessage(error)}`);
        } finally {
            setIsMutatingTodos(false);
        }
    };

    const removeTodo = async (todo) => {
        if (!supabase || isMutatingTodos) return;

        setIsMutatingTodos(true);
        setTodoError(null);
        try {
            const { error } = await supabase
                .from('scrapbook_todos')
                .delete()
                .eq('id', todo.id)
                .select('id')
                .single();

            if (error) {
                setTodoError(`Could not remove date idea: ${getErrorMessage(error)}`);
                return;
            }

            setTodos(current => current.filter(item => item.id !== todo.id));
        } catch (error) {
            setTodoError(`Could not remove date idea: ${getErrorMessage(error)}`);
        } finally {
            setIsMutatingTodos(false);
        }
    };

    return (
        <main className="scrapbook-page">
            <div className="scrapbook-content">
                <section className="scrapbook-todo">
                    <h2 className="scrapbook-todo-heading">To-Do List</h2>
                    <form className="scrapbook-todo-form" onSubmit={addTodo}>
                        <label className="scrapbook-sr-only" htmlFor="scrapbook-todo-input">
                            Add a date plan
                        </label>
                        <input
                            id="scrapbook-todo-input"
                            type="text"
                            maxLength={200}
                            value={newTodo}
                            onChange={event => setNewTodo(event.target.value)}
                        />
                        <label className="scrapbook-sr-only" htmlFor="scrapbook-todo-category">
                            Choose a category
                        </label>
                        <div className="scrapbook-category-select">
                            <select
                                id="scrapbook-todo-category"
                                value={newTodoCategory}
                                disabled={isLoadingTodos || isMutatingTodos}
                                onChange={event => setNewTodoCategory(event.target.value)}
                            >
                                {todoCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" disabled={!newTodo.trim() || isLoadingTodos || isMutatingTodos}>
                            Add
                        </button>
                    </form>
                    {todoError && <p className="scrapbook-todo-error" role="alert">{todoError}</p>}
                    {isLoadingTodos ? (
                        <p className="scrapbook-todo-empty" role="status">Loading date ideas...</p>
                    ) : todos.length > 0 ? (
                        <div className="scrapbook-todo-categories">
                            {todoCategories.map(category => {
                                const categoryTodos = todos.filter(todo => todo.category === category);
                                return (
                                    <section key={category} className="scrapbook-todo-category">
                                        <h3>{category}</h3>
                                        {categoryTodos.length > 0 ? (
                                            <ul className="scrapbook-todo-list">
                                                {categoryTodos.map(todo => (
                                                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={todo.completed}
                                                                disabled={isMutatingTodos}
                                                                onChange={() => toggleTodo(todo)}
                                                            />
                                                            <span>{todo.title}</span>
                                                        </label>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeTodo(todo)}
                                                            disabled={isMutatingTodos}
                                                            aria-label={`Remove ${todo.title}`}
                                                        >
                                                            ×
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="scrapbook-todo-empty">No ideas yet.</p>
                                        )}
                                    </section>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="scrapbook-todo-empty"></p>
                    )}
                </section>
                <section>
                    <h1 className="scrapbook-heading">Our Story</h1>
                    <div className="scrapbook-timeline">
                        {events.map((event, idx) => (
                            <article key={event.title} className="scrapbook-event">
                                <div className="scrapbook-marker-column" aria-hidden="true">
                                    <span className="scrapbook-marker" />
                                    {idx < events.length - 1 && <span className="scrapbook-connector" />}
                                </div>
                                <div className="scrapbook-event-content">
                                    <div className="scrapbook-event-header">
                                        <div>
                                            <h2>{event.title}</h2>
                                            <p className="scrapbook-location">{event.location}</p>
                                        </div>
                                        <time className="scrapbook-date">{event.date}</time>
                                    </div>
                                    <ul className="scrapbook-details">
                                        {event.bullets.map((b, i) => (
                                            <li key={i}>{b}</li>
                                        ))}
                                    </ul>
                                    {event.photos && (
                                        <div className="scrapbook-photos">
                                            {event.photos.map((photo, photoIndex) => (
                                                <button
                                                    key={photo}
                                                    className="scrapbook-photo-button"
                                                    type="button"
                                                    onClick={() => setActivePhoto({
                                                        src: photo,
                                                        alt: `${event.title} memory ${photoIndex + 1}`,
                                                    })}
                                                    aria-label={`Zoom in on ${event.title} memory ${photoIndex + 1}`}
                                                >
                                                    <img
                                                        src={photo}
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </div>
            {activePhoto && (
                <div
                    className="scrapbook-lightbox"
                    onClick={() => setActivePhoto(null)}
                    role="presentation"
                >
                    <div
                        className="scrapbook-lightbox-content"
                        role="dialog"
                        aria-modal="true"
                        aria-label={activePhoto.alt}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            className="scrapbook-lightbox-close"
                            type="button"
                            onClick={() => setActivePhoto(null)}
                            aria-label="Close enlarged photo"
                        >
                            ×
                        </button>
                        <img src={activePhoto.src} alt={activePhoto.alt} />
                    </div>
                </div>
            )}
        </main>
    );
}

export default Scrapbook;
