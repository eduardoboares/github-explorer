import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import {
    Issue,
    Repository,
    RepositoryParams,
} from '../../models/repository.model';
import api from '../../services/api';
import { Header, Issues, RepositoryInfo } from './styles';

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<Repository | null>(null);
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        api.get<Repository>(`repos/${params.repository}`).then((response) => {
            setRepository(response.data);
        });

        api.get<Issue[]>(`repos/${params.repository}/issues`).then(
            (response) => {
                setIssues(response.data);
            },
        );
    }, [params.repository]);

    return (
        <>
            <Header>
                <img src={logoImg} alt="GitHub Explorer" />

                <Link to="/">
                    <FiChevronLeft size={16} />
                    Voltar
                </Link>
            </Header>

            {repository ? (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt="Rocketseat"
                        />

                        <div>
                            <strong>{repository.full_name}</strong>

                            <p>{repository.description}</p>
                        </div>
                    </header>

                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>stars</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            ) : (
                <p>Carregando...</p>
            )}

            <Issues>
                {issues.map((issue) => (
                    <a key={issue.id} href={issue.html_url}>
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
