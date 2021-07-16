import React from 'react';
import { FiChevronRight } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import { Form, Repositories, Title } from './styles';

const Dashboard: React.FC = () => (
    <>
        <img src={logoImg} alt="GitHub Explorer" />
        <Title>Explore repositórios no GitHub</Title>

        <Form action="">
            <input placeholder="Digite o nome do repositório" />
            <button type="submit">Pesquisar</button>
        </Form>

        <Repositories>
            <a href="teste">
                <img
                    src="https://avatars.githubusercontent.com/u/50203486?v=4"
                    alt="Eduardo Pereira Boares"
                />
                <div>
                    <strong>Rocketseat/unform</strong>
                    <p>Performance-focused API for React forms 🚀</p>
                </div>

                <FiChevronRight size={20} />
            </a>
        </Repositories>
    </>
);

export default Dashboard;
